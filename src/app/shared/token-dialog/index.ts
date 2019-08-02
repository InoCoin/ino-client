import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenDialog } from './component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [
    TokenDialog
  ],
  exports: [
    TokenDialog
  ]
})

class TokenDialogModule { }

export {
  TokenDialog,
  TokenDialogModule
}