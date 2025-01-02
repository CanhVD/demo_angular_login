import { RefreshTokenRequest } from './../requests/authRequest';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const tokensInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router:Router = new Router();
  
  let token = tokenService.getToken();
  if (token) {
    console.log(token);
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
    return next(newReq).pipe(
      catchError((error) => {
        debugger
        if (error.status === 401) {
          let refresh_token = tokenService.getRefreshToken();
          return authService.refreshToken({refresh_token} as RefreshTokenRequest).pipe(
            switchMap((result) => {
              tokenService.setToken(result.data.access_token);
              tokenService.setRefreshToken(result.data.refresh_token);
              const newAuthReq = req.clone({
                headers: req.headers.append('Authorization', `Bearer ${result.data.access_token}`),
              });
              return next(newAuthReq);
            }),
            catchError(() => {
              tokenService.removeToken()
              router.navigate(['/auth/login']);
              return throwError(() => error);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
  
  return next(req);
};
