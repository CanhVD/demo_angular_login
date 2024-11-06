import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { UserRequest } from '../../../requests/userRequest';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UserService } from '../../../services/user.service';
import { ApiResponse } from '../../../responses/apiResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../models/user';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [NzModalModule, FormsModule, NzFormModule, NzInputModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  @Input() title: string = '';

  @Input() user: User = {
    id: 0,
    username: '',
    password: '',
    createdAt: new Date,
    createBy: '',
    updatedAt: new Date,
    updateBy: ''
  }

  @Output() closeModal = new EventEmitter<boolean>();

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
      console.log('Form Submitted:', form.value);
      this.userService.addUser(form.value).subscribe({
        next: (apiResponse: ApiResponse) => {
          alert('Thêm mới khách hàng thành công')
          this.closeModal.emit(false);
        },
        complete: () => {
        },
        error: (error: HttpErrorResponse) => {
          alert('Thêm mới khách hàng thất bại')
          this.closeModal.emit(false);
        }
      })
    }
  }
}
