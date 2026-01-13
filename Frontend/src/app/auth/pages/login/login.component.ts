import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/auth.service';
import { PasswordToggleHelper } from '../../../helper/password-toggle.helper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Output() switchForm = new EventEmitter<void>();

  password: string = '';
  passwordToggle = new PasswordToggleHelper();

  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    const { username, password } = this.loginForm.value;

    this.authService.login({ username, password }).subscribe({
      next: (res: any) => {
        const imagePath = `http://localhost:5000${res.user.userImage}`;
        localStorage.setItem('userId', res.user.id);
        localStorage.setItem('imageUrl', imagePath);
        localStorage.setItem('username', res.user.username);
        localStorage.setItem('role', res.user.role);

        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          err?.error?.message || 'Invalid Username or Password';
      },
    });
  }
}
