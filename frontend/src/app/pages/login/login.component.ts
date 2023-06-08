import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private formBuilder: FormBuilder, private auth: AuthentificationService) {}

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  signIn() {
    if (this.loginForm.valid) {
      this.auth
        .login(this.loginForm.value)
        .subscribe((success) => {
          if (success) {
            this.router.navigate(['/']);
          } else {
            alert('Erreur de connexion');
          }
        });
    }
  }
}
