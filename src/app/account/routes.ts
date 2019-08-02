import { Route } from '@angular/router';

export const MODULE_ROUTES: Route[] = [
  {
    path: 'wallets',
    loadChildren: () => import('./wallets/index').then(m => m.WalletsModule),
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/index').then(m => m.MyProjectsModule),
  }
];