import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { ForgottenPasswordDialog } from './component';
import { InputModule } from '../input-component';
import { LazyImageModule } from '../lazy-image-component';
import { RegisterDialogModule, RegisterDialog } from '../register-dialog';
import { SuccessDialog, SuccessDialogModule } from '../success-dialog';

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
    SuccessDialogModule
  ],
  entryComponents: [
    RegisterDialog,
    SuccessDialog
  ],
  declarations: [
    ForgottenPasswordDialog
  ],
  exports: [
    ForgottenPasswordDialog
  ]
})

class ForgottenPasswordDialogModule { }

export {
  ForgottenPasswordDialog,
  ForgottenPasswordDialogModule
}