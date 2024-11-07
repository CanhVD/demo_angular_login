import { Component, EventEmitter, inject, Inject, Input, Output } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { ApiResponse } from '../../../responses/apiResponse';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [NzModalModule],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {
  @Input() user: User = {
    id: 0,
    username: '',
    email: '',
    password: '',
    createdAt: new Date,
    createBy: '',
    updatedAt: new Date,
    updateBy: ''
  }

  @Output() handleDelete = new EventEmitter<void>();

  @Output() loadUsers = new EventEmitter<void>();

  userService: UserService = inject(UserService);


  handleOk(): void {
    this.userService.deleteUser(this.user.id).subscribe({
      next: (apiResponse: ApiResponse) => {
        alert('Xóa khách hàng thành công')
        this.loadUsers.emit()
        this.handleDelete.emit();
      },
      complete: () => {
      },
      error: (error: HttpErrorResponse) => {
        alert('Xóa khách hàng thất bại')
        this.handleDelete.emit();
      }
    })
  }

  handleCancel(): void {
    this.handleDelete.emit();
  }
}
