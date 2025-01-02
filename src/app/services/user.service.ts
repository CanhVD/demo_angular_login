import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../responses/apiResponse';
import { User } from '../models/user';
import { UserPageResponse  } from '../responses/userPageRespones';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(page: number, size: number): Observable<ApiResponse<UserPageResponse >> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', size.toString());
    return this.http.get<ApiResponse<UserPageResponse >>(`${environment.apiBaseUrl}/users/search`, { params });
  }

  addUser(user: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${environment.apiBaseUrl}/users`, user);
  }

  updateUser(user: User): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${environment.apiBaseUrl}/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${environment.apiBaseUrl}/users/${id}`);
  }
}


