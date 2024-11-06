import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../responses/apiResponse';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(page: number, size: number): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', size.toString());
    return this.http.get<ApiResponse>(`${environment.apiBaseUrl}/users/search`, { params });
  }

  addUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.apiBaseUrl}/users`, user);
  }
}


