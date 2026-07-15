import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/public-layout/public-layout').then(m => m.PublicLayout),
    children: [
      { path: '', loadChildren: () => import('./features/landing/landing.routes').then(m => m.LANDING_ROUTES) },
      { path: 'login', loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES) }
    ]
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/app-layout/app-layout').then(m => m.AppLayout),
    children: [
      { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) },
      { path: 'categories', loadChildren: () => import('./features/categories/categories.routes').then(m => m.CATEGORIES_ROUTES) },
      { path: 'formations', loadChildren: () => import('./features/formations/formations.routes').then(m => m.FORMATIONS_ROUTES) },
      { path: 'sessions', loadChildren: () => import('./features/sessions/sessions.routes').then(m => m.SESSIONS_ROUTES) },
      { path: 'my-sessions', loadChildren: () => import('./features/my-sessions/my-sessions.routes').then(m => m.MY_SESSIONS_ROUTES) },
      { path: 'anam', loadChildren: () => import('./features/anam/anam.routes').then(m => m.ANAM_ROUTES) },
      { path: 'profile', loadChildren: () => import('./features/profile/profile.routes').then(m => m.PROFILE_ROUTES) }
    ]
  },
  { path: '**', loadComponent: () => import('./features/not-found/not-found').then(m => m.NotFound) }
];
