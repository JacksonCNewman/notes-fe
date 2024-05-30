import {HttpInterceptorFn} from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const jwtToken = getJwtToken();
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    });

    return next(authReq);
}

function getJwtToken(): string | null {
  return localStorage.getItem('jwt');
}
