import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatButtonModule, MatSelectModule, MatDialogModule, MatListModule, MatCheckboxModule, MatCardModule } from '@angular/material'

import { MiniProjectModule } from '../shared/mini-project/project.module';
import { MiniAccountModule } from '../shared/mini-account/account.module';
import { BoostModule } from '../shared/boost/boost.module';
import { TransactionModule } from '../shared/transaction/transaction.module';

import { ProjectModule } from '../shared/project-dialog/project.module';
import { ProjectDialog } from '../shared/project-dialog/project.component';

import { AccountDialogModule } from '../shared/account-dialog/account.module';
import { AccountDialog } from '../shared/account-dialog/account.component';

import { NewAccountDialogModule } from '../shared/account-new-dialog/account.module';
import { NewAccountDialog } from '../shared/account-new-dialog/account.component';

import { MODULE_COMPONENTS, MODULE_ROUTES } from './account.routes';

@NgModule({
  declarations: [
    MODULE_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(MODULE_ROUTES),

    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,
    MatCardModule,

    ProjectModule,
    AccountDialogModule,
    NewAccountDialogModule,
    MiniProjectModule,
    MiniAccountModule,
    BoostModule,
    TransactionModule
  ],
  entryComponents: [
    ProjectDialog,
    AccountDialog,
    NewAccountDialog
  ],
})

export class AccountModule { }
