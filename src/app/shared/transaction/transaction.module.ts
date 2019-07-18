import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionComponent } from './transaction.component';
import { MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material'


@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  declarations: [
    TransactionComponent
  ],
  exports: [
    TransactionComponent
  ]
})

export class TransactionModule { }
