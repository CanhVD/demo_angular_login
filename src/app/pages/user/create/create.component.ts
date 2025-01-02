import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UserService } from '../../../services/user.service';
import { ApiResponse } from '../../../responses/apiResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../models/user';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [NzModalModule, FormsModule, NzFormModule, NzInputModule, NgIf],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  @Input() title: string = '';

  @Input() user: User = {
    id: 0,
    username: '',
    password: '',
    email: '',
    createdAt: new Date,
    createBy: '',
    updatedAt: new Date,
    updateBy: ''
  }

  @Output() closeModal = new EventEmitter<boolean>();

  @Output() loadUsers = new EventEmitter<void>();

  userService: UserService = inject(UserService);

  ngOnInit(): void {

  }

  close(): void {
    this.closeModal.emit(false);
  }

  handleOk(): void {
    this.closeModal.emit(false);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.user.id ? this.handleUpdateUser({ id: this.user.id, ...form.value }) : this.handleAddUser(form.value)
    }
  }

  handleAddUser(value: any): void {
    this.userService.addUser(value).subscribe({
      next: (apiResponse: ApiResponse<User>) => {
        if (apiResponse.code) {
          alert('Thêm mới khách hàng thất bại')
          return
        }

        alert('Thêm mới khách hàng thành công')
        this.loadUsers.emit()
        this.closeModal.emit(false);
      },
      error: (error: HttpErrorResponse) => {
        alert('Thêm mới khách hàng thất bại')
        this.closeModal.emit(false);
      }
    })
  }

  handleUpdateUser(value: any): void {
    this.userService.updateUser(value).subscribe({
      next: (apiResponse: ApiResponse<User>) => {
        if (apiResponse.code) {
          alert('Chỉnh sửa khách hàng thất bại')
          return
        }
        
        alert('Chỉnh sửa khách hàng thành công')
        this.loadUsers.emit()
        this.closeModal.emit(false);
      },
      error: (error: HttpErrorResponse) => {
        alert('Chỉnh sửa khách hàng thất bại')
        this.closeModal.emit(false);
      }
    })
  }
}
