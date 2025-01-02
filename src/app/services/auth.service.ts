import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, RefreshTokenRequest } from '../requests/authRequest';
import { Observable } from 'rxjs';
import { ApiResponse } from '../responses/apiResponse';
import { environment } from '../environments/environment';
import { AuthResponse } from '../responses/authRespones';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${environment.apiBaseUrl}/login`, request);
  }

  refreshToken(request: RefreshTokenRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${environment.apiBaseUrl}/refresh-token`, request);
  }
}
