import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { tap } from 'rxjs';

export const authGuard = () => {
  const router = inject(Router);
  const auth = inject(AuthentificationService);

  return auth.$jwt.pipe(
    tap((value) => (value == null ? router.navigate(['/login']) : false))
  );
};
