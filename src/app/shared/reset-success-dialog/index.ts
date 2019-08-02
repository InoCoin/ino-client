import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetSuccessDialog } from './component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [
    ResetSuccessDialog
  ],
  exports: [
    ResetSuccessDialog
  ]
})

class ResetSuccessDialogModule { }

export {
  ResetSuccessDialog,
  ResetSuccessDialogModule
}