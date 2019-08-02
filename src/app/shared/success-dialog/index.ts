import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessDialog } from './component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [
    SuccessDialog
  ],
  exports: [
    SuccessDialog
  ]
})

class SuccessDialogModule { }

export {
  SuccessDialog,
  SuccessDialogModule
}