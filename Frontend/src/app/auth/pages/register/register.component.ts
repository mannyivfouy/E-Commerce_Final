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
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        if (err.error?.message === 'Username Already Exists') {
          this.usernameExists = true;
          this.registerForm.get('username')?.setErrors({ exists: true });
        } else {
          this.errorMessage = err.error?.message || 'Register Failed';
        }
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
