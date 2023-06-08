import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const jwt = localStorage.getItem('jwt');
    if (jwt !== null) {
      const requestClone = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return next.handle(requestClone);
    }

    return next.handle(request);
  }
}
