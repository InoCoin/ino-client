import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatDialogModule } from '@angular/material'

import { KeystoreDialog } from './component';
import { PrivateKeyDialogModule, PrivateKeyDialog } from '../private-key';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatInputModule,
    MatDialogModule,

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

class KeystoreDialogModule { }

export {
  KeystoreDialog,
  KeystoreDialogModule
}