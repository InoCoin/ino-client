import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SendDialog } from './component';
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
    SendDialog
  ],
  exports: [
    SendDialog
  ]
})

class SendDialogModule { }

export {
  SendDialog,
  SendDialogModule
}