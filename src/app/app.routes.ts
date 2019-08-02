import { Route } from '@angular/router';
import { AuthGuardProvider, AdminGuardProvider } from './guards';

export const MODULE_ROUTES: Route[] = [
  {
    path: '',
    loadChildren: () => import('./main/module').then(m => m.MainModule)
  },
  {
    path: 'account',
    canActivate: [AuthGuardProvider],
    loadChildren: () => import('./account/module').then(m => m.AccountModule)
  },
  {
    path: 'admin',
    canActivate: [AdminGuardProvider],
    loadChildren: () => import('./admin/module').then(m => m.AdminModule)
  },
  {
    path: '**',
    redirectTo: ''
  },
];

export const MODULE_COMPONENTS = [];
