import { inject } from "@angular/core";
import { TokenService } from "../services/token.service";
import { HttpHandlerFn, HttpRequest } from "@angular/common/http";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    const token = inject(TokenService).getToken();
    const newReq = req.clone({
        headers: req.headers.append('Authentication', token),
    });
    return next(newReq);
}