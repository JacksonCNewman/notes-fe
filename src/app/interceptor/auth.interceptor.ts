import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';

import {AuthService} from "../service/auth.service";

import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private authService: AuthService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isRefreshing = false;

    const jwtToken = getJwtToken();
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    });

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          (error.status === 401 || error.status === 403)
        ) {
          return this.handleError(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handleError(authReq: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

        return this.authService.refreshToken().pipe(
          switchMap(() => {
            this.isRefreshing = false;

            const jwtToken = getJwtToken();
            const refreshedAuthReq = authReq.clone({
              setHeaders: {
                Authorization: `Bearer ${jwtToken}`
              }
            });

            return next.handle(refreshedAuthReq);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == '403') {
              this.authService.logout();
            }

            return throwError(() => error);
          })
        );
    }
    return next.handle(authReq);
  }
}

function getJwtToken(): string | null {
  return localStorage.getItem('jwt');
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
