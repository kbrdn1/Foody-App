import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import Jwt from '../models/jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(private http: HttpClient) {
    this.setJwt();
  }

  $jwt: BehaviorSubject<Jwt | null> = new BehaviorSubject<Jwt | null>(null);

  login(user: { email: string; password: string }): Observable<boolean> {
    return new Observable<boolean>((resolve) => {
      this.http.post('http://localhost:3000/login', user).subscribe({
        next: (response: any) => {
          localStorage.setItem('jwt', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.setJwt();
          resolve.next(true);
          resolve.complete();
        },
        error: (error) => {
          console.log(error);
          resolve.next(false);
          resolve.complete();
        },
      });
    });
  }

  register(user: { firstname: string; lastname: string; email: string; password: string }): Observable<boolean> {
    return new Observable<boolean>((resolve) => {
      this.http.post('http://localhost:3000/register', user).subscribe({
        next: (response: any) => {
          resolve.next(true);
          resolve.complete();
        },
        error: (error) => {
          console.log(error);
          resolve.next(false);
          resolve.complete();
        },
      });
    });
  }

  setJwt() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const decodedJwt = JSON.parse(atob(jwt.split('.')[1]));
      this.$jwt.next(decodedJwt);
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.$jwt.next(null);
  }
}
