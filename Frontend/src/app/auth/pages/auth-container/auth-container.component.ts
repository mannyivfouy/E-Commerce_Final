import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-container',
  imports: [LoginComponent, RegisterComponent, CommonModule],
  templateUrl: './auth-container.component.html',
  styleUrl: './auth-container.component.css',
})
export class AuthContainerComponent {
  isLogin = true;

  toggle() {
    this.isLogin = !this.isLogin;    
  }
}
