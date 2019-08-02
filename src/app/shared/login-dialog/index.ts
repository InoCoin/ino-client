import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { LoginDialog } from './component';
import { InputModule } from '../input-component';
import { LazyImageModule } from '../lazy-image-component';
import { RegisterDialogModule, RegisterDialog } from '../register-dialog';
import { ForgottenPasswordDialogModule, ForgottenPasswordDialog } from '../forgotten-password-dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    InputModule,
    LazyImageModule,
    RegisterDialogModule,
    ForgottenPasswordDialogModule
  ],
  entryComponents: [
    RegisterDialog,
    ForgottenPasswordDialog
  ],
  declarations: [
    LoginDialog
  ],
  exports: [
    LoginDialog
  ]
})

class LoginDialogModule { }

export {
  LoginDialog,
  LoginDialogModule
}