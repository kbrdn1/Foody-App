import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder, private auth: AuthentificationService, private router: Router) { }

  registerForm: FormGroup = this.formBuilder.group({
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  signUp() {
    if (this.registerForm.valid) {
      this.auth
        .register(this.registerForm.value)
        .subscribe((success) => {
          if (success) {
            this.router.navigate(['/login']);
          } else {
            alert('Erreur de connexion');
          }
        });
    }
  }
}
