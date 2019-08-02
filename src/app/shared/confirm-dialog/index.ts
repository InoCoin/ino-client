import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material'

import { ConfirmDialog } from './component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    ConfirmDialog
  ],
  exports: [
    ConfirmDialog
  ]
})

class ConfirmDialogModule { }

export {
  ConfirmDialog,
  ConfirmDialogModule
}