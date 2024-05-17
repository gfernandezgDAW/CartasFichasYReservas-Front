import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { UtilsService } from '../services/utils.service';
import { AUTH_ERROR_CODES } from './auth.interceptor';

@Injectable()
export class GenericNetworkErrorInterceptor implements HttpInterceptor {
  constructor(private utilsService: UtilsService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        const token = localStorage.getItem('cfyrAppToken');
        if (!AUTH_ERROR_CODES.includes(err.status) && token) {
          this.utilsService.displayToast(`${err.error.message}`, 'error');
        }

        return throwError(() => err);
      })
    );
  }
}
