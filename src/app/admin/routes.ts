import { Route } from '@angular/router';

export const MODULE_ROUTES: Route[] = [
  {
    path: 'configuration',
    loadChildren: () => import('./configuration/index').then(m => m.ConfigurationModule),
  },
];