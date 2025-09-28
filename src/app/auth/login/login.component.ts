import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button'; // Import thêm module này
import { LoginRequest } from '../../requests/authRequest';
import { AuthService } from '../../services/auth.service';
import { ApiResponse } from '../../responses/apiResponse';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../../services/token.service';
import { AuthResponse } from '../../responses/authRespones';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NzFormModule, NzInputModule, NzModalModule, NzButtonModule], // Thêm NzButtonModule vào đây
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isSubmitting = false;

  constructor(private router: Router) { }

  authService: AuthService = inject(AuthService);
  tokenService: TokenService = inject(TokenService);

  user: LoginRequest = {
    username: 'George Kelly',
    password: 'NbosTNBUIb'
  };

  onSubmit(formLogin: NgForm) {
    if (!formLogin.valid) {
      alert('Vui lòng điền đầy đủ thông tin đăng nhập.');
      return;
    }

    this.isSubmitting = true; // Bật trạng thái chờ
    this.authService.login(formLogin.value).subscribe({
      next: (apiResponse: ApiResponse<AuthResponse>) => {
        this.isSubmitting = false; // Tắt trạng thái chờ
        if (apiResponse.code) {
          alert('Tài khoản hoặc mật khẩu không chính xác');
          return;
        }
        this.handleSuccessfulLogin(apiResponse.data);
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting = false; // Tắt trạng thái chờ
        this.handleLoginError(error);
      }
    });
  }

  private handleSuccessfulLogin(data: AuthResponse) {
    this.tokenService.setToken(data.access_token);
    this.tokenService.setRefreshToken(data.refresh_token);
    this.router.navigate(['/user']);
  }

  private handleLoginError(error: HttpErrorResponse) {
    console.error('Login error:', error);
    alert('Đăng nhập không thành công. Vui lòng thử lại.');
  }
}
