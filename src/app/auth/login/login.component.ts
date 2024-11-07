import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { UserRequest } from '../../requests/userRequest';
import { AuthService } from '../../services/auth.service';
import { ApiResponse } from '../../responses/apiResponse';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NzFormModule, NzInputModule, NzModalModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router) { }

  authService: AuthService = inject(AuthService);

  tokenService: TokenService = inject(TokenService);

  user: UserRequest = {
    username: '',
    password: ''
  }

  onSubmit(formLogin: NgForm) {
    this.authService.login(formLogin.value).subscribe({
      next: (apiResponse: ApiResponse) => {
        debugger
        alert('Đăng nhập thành công')
        this.tokenService.setToken(apiResponse.data.access_token)
        this.router.navigate(['/user']);
      },
      complete: () => {
      },
      error: (error: HttpErrorResponse) => {
        alert('Đăng nhập không thành công')
      }
    })
  }
}
