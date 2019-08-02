import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { LazyImageModule } from '../lazy-image-component';
import { CopyModule } from 'src/app/directives/copy';
import { KeystoreDialog, KeystoreDialogModule } from '../keystore-dialog';
import { SendDialog, SendDialogModule } from '../send-dialog';
import { ConfirmDialog, ConfirmDialogModule } from '../confirm-dialog';
import { BuyCryptoDialog, BuyCryptoDialogModule } from '../buy-crypto-dialog';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    LazyImageModule,
    KeystoreDialogModule,
    SendDialogModule,
    ConfirmDialogModule,
    BuyCryptoDialogModule,
    CopyModule
  ],
  declarations: [
    WalletComponent
  ],
  exports: [
    WalletComponent
  ],
  entryComponents: [
    KeystoreDialog,
    SendDialog,
    ConfirmDialog,
    BuyCryptoDialog
  ]
})

export class WalletModule { }
