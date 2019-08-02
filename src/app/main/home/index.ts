import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material';

import { HomeComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { ScrollerModule } from 'src/app/shared/scroller-component';
import { LoginDialogModule, LoginDialog } from 'src/app/shared/login-dialog';
import { RegisterDialogModule, RegisterDialog } from 'src/app/shared/register-dialog';
import { TokenDialogModule, TokenDialog } from 'src/app/shared/token-dialog';
import { ForgottenPasswordDialogModule, ForgottenPasswordDialog } from 'src/app/shared/forgotten-password-dialog';
import { ResetPasswordDialogModule, ResetPasswordDialog } from 'src/app/shared/reset-password';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'user/:action',
        component: HomeComponent,
      },
      {
        path: 'user/:action/:token',
        component: HomeComponent,
      },
    ]),
    MatButtonModule,
    MatDialogModule,
    LazyImageModule,
    ScrollerModule,
    LoginDialogModule,
    RegisterDialogModule,
    TokenDialogModule,
    ForgottenPasswordDialogModule,
    ResetPasswordDialogModule
  ],
  entryComponents: [
    LoginDialog,
    RegisterDialog,
    TokenDialog,
    ForgottenPasswordDialog,
    ResetPasswordDialog
  ]
})

export class HomeModule { }

