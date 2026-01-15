import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../api/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const userRole = localStorage.getItem('role')?.toLowerCase();
    const userId = localStorage.getItem('userId');

    // Not logged in
    if (!userId || !userRole) {
      this.router.navigate(['/auth']);
      return false;
    }

    // Allow multiple roles for shared pages
    if (Array.isArray(expectedRole)) {
      const allowedRoles = expectedRole.map((r) => r.toLowerCase());
      if (!allowedRoles.includes(userRole)) {
        this.redirectUser(userRole); // ✅ this is inside the class
        return false;
      }
    } else {
      if (userRole !== expectedRole.toLowerCase()) {
        this.redirectUser(userRole); // ✅ this is inside the class
        return false;
      }
    }

    return true;
  }
  
  private redirectUser(userRole: string) {
    if (userRole === 'admin' || userRole === 'administrator') {
      this.router.navigate(['/admin/dashboard']);
    } else if (userRole === 'user') {
      this.router.navigate(['/store']);
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
