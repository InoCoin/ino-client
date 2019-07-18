import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material'

import { KeystoreDialog } from './keystore.component';
import { PrivateKeyDialog } from '../private-key/privatekey.component';
import { PrivateKeyDialogModule } from '../private-key/privatekey.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule,

    PrivateKeyDialogModule
  ],
  declarations: [
    KeystoreDialog
  ],
  exports: [
    KeystoreDialog
  ],
  entryComponents: [
    PrivateKeyDialog
  ]
})

export class KeystoreDialogModule { }
