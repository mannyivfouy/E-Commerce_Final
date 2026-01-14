import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthContainerComponent } from './auth/pages/auth-container/auth-container.component';
import { DashboardComponent } from './features/admin/pages/dashboard/dashboard.component';
import { UserListComponent } from './features/admin/pages/users/user-list/user-list.component';
import { UserFormComponent } from './features/admin/pages/users/user-form/user-form.component';
import { ProductListComponent } from './features/admin/pages/products/product-list/product-list.component';
import { ProductFormComponent } from './features/admin/pages/products/product-form/product-form.component';
import { CategoryListComponent } from './features/admin/pages/categories/category-list/category-list.component';
import { CategoryFormComponent } from './features/admin/pages/categories/category-form/category-form.component';
import { RoleGuard } from './guards/role.guard';
import { StoreComponent } from './features/client/pages/store/store.component';
import { ProfileComponent } from './features/client/pages/profile/profile.component';
import { StoreLayoutComponent } from './layouts/store-layout/store-layout.component';

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
    path: 'admin',
    component: MainLayoutComponent,
    canActivate: [RoleGuard],
    data: { role: 'Administrator' },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            component: UserListComponent,
          },
          {
            path: 'createUser',
            component: UserFormComponent,
          },
          {
            path: 'editUser/:id',
            component: UserFormComponent,
          },
        ],
      },
      {
        path: 'product',
        children: [
          {
            path: '',
            component: ProductListComponent,
          },
          {
            path: 'createProduct',
            component: ProductFormComponent,
          },
          {
            path: 'editProduct/:id',
            component: ProductFormComponent,
          },
        ],
      },
      {
        path: 'category',
        children: [
          {
            path: '',
            component: CategoryListComponent,
          },
          {
            path: 'createCategory',
            component: CategoryFormComponent,
          },
          {
            path: 'editCategory/:id',
            component: CategoryFormComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'user',
    component: StoreLayoutComponent,
    canActivate: [RoleGuard],
    data: { role: 'User' },
    children: [
      {
        path: 'store',
        component: StoreComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: ' ',
  },
];
