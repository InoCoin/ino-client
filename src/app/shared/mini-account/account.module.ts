import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniAccountComponent } from './account.component';
import { MatButtonModule, MatIconModule } from '@angular/material'
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { KeystoreDialogModule } from '../keystore-dialog/keystore.module'
import { KeystoreDialog } from '../keystore-dialog/keystore.component'

import { SendDialogModule } from '../send-dialog/send.module'
import { SendDialog } from '../send-dialog/send.component'

import { ConfirmDialogModule } from '../confirm-dialog/confirm.module';
import { ConfirmDialog } from '../confirm-dialog/confirm.component';

import { BuyDialogModule } from '../buy-dialog/buy.module';
import { BuyDialog } from '../buy-dialog/buy.component';

import { BuyCryptoDialogModule } from '../buy-crypto-dialog/buy.module';
import { BuyCryptoDialog } from '../buy-crypto-dialog/buy.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,

    KeystoreDialogModule,
    SendDialogModule,
    ConfirmDialogModule,
    BuyDialogModule,
    BuyCryptoDialogModule
  ],
  entryComponents: [
    KeystoreDialog,
    SendDialog,
    ConfirmDialog,
    BuyDialog,
    BuyCryptoDialog
  ],
  declarations: [
    MiniAccountComponent
  ],
  exports: [
    MiniAccountComponent
  ]
})

export class MiniAccountModule { }
