import { Component } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import Jwt from 'src/app/models/jwt';
import User from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  jwt: Jwt | null = null;
  user: User | null = this.getUser();

  constructor(private auth: AuthentificationService) {
    this.auth.$jwt.subscribe({
      next: (jwt) => {
        this.jwt = jwt;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  signOut() {
    this.auth.logout();
    window.location.reload();
  }
}
