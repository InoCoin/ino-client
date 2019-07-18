import { Route } from '@angular/router';
import { Configuration } from './Configuration';
import { Payments } from './Payments';
import { Updates } from './Updates';
import { Places } from './Places';
import { NewAccounts } from './NewAccounts';

export const MODULE_ROUTES: Route[] = [
  {
    path: 'configuration',
    component: Configuration
  },
  {
    path: 'payments',
    component: Payments
  },
  {
    path: 'updates',
    component: Updates
  },
  {
    path: 'places',
    component: Places
  },
  {
    path: 'new-accounts',
    component: NewAccounts
  }
];

export const MODULE_COMPONENTS = [
  Configuration,
  Payments,
  Updates,
  Places,
  NewAccounts
];
