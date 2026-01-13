import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthContainerComponent } from './auth/pages/auth-container/auth-container.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthContainerComponent,
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [],
  },
];
