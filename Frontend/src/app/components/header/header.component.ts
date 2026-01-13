import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../api/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  userImage: string = 'http://localhost:5000/uploads/users/default.png';
  username: string | null = '';
  role: string | null = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const storedImage = localStorage.getItem('imageUrl');
    const storedUsername = localStorage.getItem('username');
    const storeUserRole = localStorage.getItem('role');

    if (storedImage) this.userImage = storedImage;
    if (storedUsername) this.username = storedUsername;
    if (storeUserRole) this.role = storeUserRole;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
