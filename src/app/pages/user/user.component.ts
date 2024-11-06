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
import { log } from 'ng-zorro-antd/core/logger';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NzTableModule, NzDividerModule, NzBreadCrumbModule, NzButtonModule, NzFlexModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  total = 0;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
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
}