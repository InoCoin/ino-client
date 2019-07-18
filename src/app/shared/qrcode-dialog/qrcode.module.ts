import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QrCodeDialog } from './qrcode.component';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  declarations: [
    QrCodeDialog
  ],
  exports: [
    QrCodeDialog
  ]
})

export class QrCodeDialogModule { }
