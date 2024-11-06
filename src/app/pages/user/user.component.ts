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

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NzTableModule, NzDividerModule, NzBreadCrumbModule, NzButtonModule, NzFlexModule, CreateComponent, NgIf],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  total = 0;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  isVisibleCreate = false;
  title = ''
  user: User = {
    id: 0,
    username: '',
    password: '',
    createdAt: new Date,
    createBy: '',
    updatedAt: new Date,
    updateBy: ''
  }
  listOfData: User[] = [];

  userService: UserService = inject(UserService);

  ngOnInit(): void {
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
        alert('get data fail')
        console.log(error);
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
        password: '',
        createdAt: new Date,
        createBy: '',
        updatedAt: new Date,
        updateBy: ''
      }
    }
    this.isVisibleCreate = true;
  }
}