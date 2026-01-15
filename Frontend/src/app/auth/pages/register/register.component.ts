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

  }

  onSubmit() {
    // This is optional, but good practice: clear old 'exists' error on new submission
    const usernameControl = this.registerForm.get('username');
    if (usernameControl?.hasError('exists')) {
      usernameControl.setErrors(null);
    }

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    const payload = this.registerForm.value;

    this.authService.register(payload).subscribe({
      next: (res: any) => {
        // ... (your existing success logic)
        this.loading = false;
        localStorage.setItem('role', 'User');
        localStorage.setItem('userId', res.user.id);
        localStorage.setItem('username', res.user.username);
        const imagePath = res.user.userImage
          ? `http://localhost:5000${res.user.userImage}`
          : 'assets/profile.png';
        localStorage.setItem('imageUrl', imagePath);
        this.router.navigate(['/user/store']);
      },
      error: (err) => {
        this.loading = false;
        // This 'err.error' part is crucial for reading the JSON body of a 400 response
        const serverMessage = err.error?.message || 'Registration Failed';

        // This condition now matches your backend's exact response
        if (serverMessage === 'Username Already Exists') {
          this.registerForm.get('username')?.setErrors({ exists: true });
        } else {
          // Display any other errors from the server
          this.errorMessage = serverMessage;
        }
      },
    });
  }
}
