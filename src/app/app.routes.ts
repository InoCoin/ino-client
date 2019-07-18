import { Route } from '@angular/router';
import { PageNotFound } from './404';
import { AdminGuardProvider } from './providers';
export const MODULE_ROUTES: Route[] = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AdminGuardProvider]
  },
  {
    path: '**',
    component: PageNotFound
  },
]

export const MODULE_COMPONENTS = [
  PageNotFound
]
