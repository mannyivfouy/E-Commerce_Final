import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PasswordToggleHelper } from '../../../helper/password-toggle.helper';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  @Output() switchForm = new EventEmitter<void>();

  password: string = '';
  passwordToggle = new PasswordToggleHelper();

  registerForm!: FormGroup;
  loading = false;
  errorMessage = '';
  usernameExists = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = fb.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.registerForm.get('username')?.valueChanges.subscribe(() => {
      this.usernameExists = false;
      const control = this.registerForm.get('username');
      if (control?.hasError('exists')) {
        control.setErrors(null);
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    const payload = this.registerForm.value;

    this.authService.register(payload).subscribe({
      next: (res: any) => {
        this.loading = false;

        // Save role in localStorage so RoleGuard allows navigation
        localStorage.setItem('role', 'User');
        localStorage.setItem('userId', res.user.id);
        localStorage.setItem('username', res.user.username);
        // Optional: save image if returned
        const imagePath = res.user.userImage
          ? `http://localhost:5000${res.user.userImage}`
          : 'assets/profile.png';
        localStorage.setItem('imageUrl', imagePath);
        this.router.navigate(['/user/store']);
      },
      error: (err) => {
        this.loading = false;

        // Safe error extraction
        const serverMessage = (
          err.error?.message ||
          err.error ||
          ''
        ).toString();

        if (serverMessage.trim().toLowerCase() === 'username already exists') {
          this.usernameExists = true;

          const control = this.registerForm.get('username');
          control?.setErrors({ exists: true });
          control?.markAsTouched();
          control?.markAsDirty();
          control?.updateValueAndValidity({ onlySelf: true });
        } else {
          this.errorMessage = serverMessage || 'Register Failed';
        }
      },
    });
  }
}
