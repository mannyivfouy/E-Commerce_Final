import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../api/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const userRole = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');

    // Not logged in
    if (!userId || !userRole) {
      this.router.navigate(['/login']);
      return false;
    }

    // Wrong role
    if (userRole !== expectedRole) {
      // Redirect user to their correct panel
      if (userRole === 'Administrator') {
        this.router.navigate(['/admin']);
      } else if (userRole === 'User') {
        this.router.navigate(['/store']);
      }
      return false;
    }

    return true;
  }
}
