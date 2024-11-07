import { Component, inject, OnInit } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../responses/apiResponse';
import { CreateComponent } from './create/create.component';
import { NgIf } from '@angular/common';
import { DeleteUserComponent } from './delete-user/delete-user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NzTableModule, NzDividerModule, NzBreadCrumbModule,
    NzButtonModule, NzFlexModule, CreateComponent, NgIf, DeleteUserComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  title = ''
  total = 0;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  isVisibleCreate = false;
  isVisibleDelete = false;
  user: User = {
    id: 0,
    username: '',
    email: '',
    password: '',
    createdAt: new Date,
    createBy: '',
    updatedAt: new Date,
    updateBy: ''
  }
  listOfData: User[] = [];

  userService: UserService = inject(UserService);

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(): void {
    this.pageIndex = 1;
    this.pageSize = 10;
    this.getUsers(this.pageIndex, this.pageSize)
  }

  getUsers(page: number, limit: number): void {
    this.userService.getUsers(page, limit).subscribe({
      next: (apiResponse: ApiResponse) => {
        this.listOfData = apiResponse.data.result;
        this.total = apiResponse.data.total
        this.loading = false
      },
      complete: () => {
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          alert('Bạn không có quyền truy cập')
          return;
        }
        alert('Get data fail')
      }
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex } = params;
    this.getUsers(pageIndex, pageSize);
  }

  closeModal(isVisible: boolean): void {
    this.isVisibleCreate = isVisible;
    console.log('ok')
  }

  displayForm(user: User | null) {
    if (user) {
      this.title = 'Sửa thông tin khách hàng'
      this.user = user;
    }
    else {
      this.title = 'Thêm mới khách hàng'
      this.user = {
        id: 0,
        username: '',
        email: '',
        password: '',
        createdAt: new Date,
        createBy: '',
        updatedAt: new Date,
        updateBy: ''
      }
    }
    this.isVisibleCreate = true
  }

  handleDelete(user: User | null) {
    if (user) {
      this.user = user;
    }
    this.isVisibleDelete = !this.isVisibleDelete;
  }
}