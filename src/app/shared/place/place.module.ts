import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatIconModule, MatButtonModule } from '@angular/material'

import { Place } from './place.component';
import { QrCodeDialogModule } from '../qrcode-dialog/qrcode.module';
import { QrCodeDialog } from '../qrcode-dialog/qrcode.component';
import { ConfirmDialogModule } from '../confirm-dialog/confirm.module';
import { ConfirmDialog } from '../confirm-dialog/confirm.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule, 
    MatButtonModule,
    
    QrCodeDialogModule,
    ConfirmDialogModule
  ],
  entryComponents: [
    QrCodeDialog,
    ConfirmDialog
  ],
  declarations: [
    Place
  ],
  exports: [
    Place
  ]
})

export class PlaceModule { }
