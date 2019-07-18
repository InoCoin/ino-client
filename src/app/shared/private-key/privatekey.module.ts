import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrivateKeyDialog } from './privatekey.component';
import { MatButtonModule, MatIconModule, MatInputModule, MatDialogModule, MatSnackBarModule } from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  declarations: [
    PrivateKeyDialog
  ],
  exports: [
    PrivateKeyDialog
  ]
})

export class PrivateKeyDialogModule { }
