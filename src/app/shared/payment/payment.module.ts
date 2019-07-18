import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Payment } from './payment.component';
import { MatButtonModule, MatIconModule, MatCardModule, MatCheckboxModule, MatSnackBarModule } from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  declarations: [
    Payment
  ],
  exports: [
    Payment
  ]
})

export class PaymentModule { }
