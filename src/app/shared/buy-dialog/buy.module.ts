import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BuyDialog } from './buy.component';
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
    BuyDialog
  ],
  exports: [
    BuyDialog
  ]
})

export class BuyDialogModule { }
