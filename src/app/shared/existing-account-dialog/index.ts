import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ExistingAccountDialog } from './component';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  declarations: [
    ExistingAccountDialog
  ],
  exports: [
    ExistingAccountDialog
  ]
})

class ExistingAccountDialogModule { }

export {
  ExistingAccountDialog,
  ExistingAccountDialogModule
}