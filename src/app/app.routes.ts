import { Routes } from '@angular/router';
import { AuthGuardFn } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
  { path: 'auth', loadChildren: () => import('./auth/login/auth.routes').then(m => m.AUTH_ROUTES) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES), canActivate: [AuthGuardFn] },
  { path: 'user', loadChildren: () => import('./pages/user/user.routes').then(m => m.USER_ROUTES), canActivate: [AuthGuardFn] },
];
