import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { ResetPasswordDialog } from './component';
import { InputModule } from '../input-component';
import { ResetSuccessDialog, ResetSuccessDialogModule } from '../reset-success-dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    InputModule,
    ResetSuccessDialogModule
  ],
  entryComponents: [
    ResetSuccessDialog
  ],
  declarations: [
    ResetPasswordDialog
  ],
  exports: [
    ResetPasswordDialog
  ]
})

class ResetPasswordDialogModule { }

export {
  ResetPasswordDialog,
  ResetPasswordDialogModule
}