import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { RegisterDialog } from './component';
import { InputModule } from '../input-component';
import { SuccessDialog, SuccessDialogModule } from '../success-dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    InputModule,
    SuccessDialogModule
  ],
  entryComponents: [
    SuccessDialog
  ],
  declarations: [
    RegisterDialog
  ],
  exports: [
    RegisterDialog
  ]
})

class RegisterDialogModule { }

export {
  RegisterDialog,
  RegisterDialogModule
}