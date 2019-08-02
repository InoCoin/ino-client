import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material';

import { WalletsComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { WalletsResolver } from 'src/app/resolvers/WalletsResolver';
import { WalletModule } from 'src/app/shared/wallet-component';
import { CopyModule } from 'src/app/directives/copy';
import { ExistingAccountDialogModule, ExistingAccountDialog } from 'src/app/shared/existing-account-dialog';
import { NewAccountDialogModule, NewAccountDialog } from 'src/app/shared/new-account-dialog';

@NgModule({
  declarations: [
    WalletsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: WalletsComponent,
      resolve: {
        result: WalletsResolver
      }
    }]),
    MatButtonModule,
    MatDialogModule,
    LazyImageModule,
    WalletModule,
    CopyModule,
    ExistingAccountDialogModule,
    NewAccountDialogModule
  ],
  entryComponents: [
    ExistingAccountDialog,
    NewAccountDialog
  ]
})

export class WalletsModule { }
