import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('cfyrAppToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${JSON.parse(token).access_token.toString()}`,
        },
      });
    }

    return next.handle(request);
  }
}
