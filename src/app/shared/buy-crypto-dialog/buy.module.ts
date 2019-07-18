import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BuyCryptoDialog } from './buy.component';
import { MatButtonModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [
    BuyCryptoDialog
  ],
  exports: [
    BuyCryptoDialog
  ]
})

export class BuyCryptoDialogModule { }
