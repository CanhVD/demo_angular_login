import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const tokensInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokenService).getToken();
  console.log(token);
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });
  return next(newReq);
};
