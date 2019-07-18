import { Route } from '@angular/router';
import { Login } from './Login';
import { Registration } from './Registration';
import { Projects } from './Projects';
import { Wallet } from './Wallet';
import { ForgottenPassword } from './ForgottenPassword';
import { ResetPassword } from './ResetPassword';
import { Activation } from './Activation';

import { AuthGuardProvider, NotAuthGuardProvider } from '../providers';

export const MODULE_ROUTES: Route[] = [
  {
    path: 'registration',
    component: Registration,
    canActivate: [NotAuthGuardProvider]
  },
  {
    path: 'login',
    component: Login,
    canActivate: [NotAuthGuardProvider]
  },
  {
    path: 'projects',
    component: Projects,
    canActivate: [AuthGuardProvider]
  },
  {
    path: 'wallet',
    component: Wallet,
    canActivate: [AuthGuardProvider]
  },
  {
    path: 'forgotten-password',
    component: ForgottenPassword,
    canActivate: [NotAuthGuardProvider]
  },
  {
    path: 'reset-password/:token',
    component: ResetPassword,
    canActivate: [NotAuthGuardProvider]
  },
  {
    path: ':token',
    component: Activation,
    canActivate: [NotAuthGuardProvider]
  }
];

export const MODULE_COMPONENTS = [
  Registration,
  Login,
  Projects,
  Wallet,
  ForgottenPassword,
  ResetPassword,
  Activation
];
