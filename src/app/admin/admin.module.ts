import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatInputModule, MatButtonModule, MatSnackBarModule, MatCardModule, MatListModule, MatIconModule, MatDialogModule } from '@angular/material'

import { MODULE_COMPONENTS, MODULE_ROUTES } from './admin.routes';

import { PaymentModule } from '../shared/payment/payment.module';
import { PlaceModule } from '../shared/place/place.module';
import { NewAccountModule } from '../shared/new-account/account.module';

import { UserModule } from '../shared/user/user.module';

import { PlaceDialogModule } from '../shared/place-dialog/place.module';
import { PlaceDialog } from '../shared/place-dialog/place.component';

@NgModule({
  declarations: [
    MODULE_COMPONENTS,
  ],
  entryComponents: [
    PlaceDialog
  ],
  imports: [
    CommonModule,
    FormsModule,

    RouterModule.forChild(MODULE_ROUTES),

    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,

    PaymentModule,
    PlaceModule,
    UserModule,
    PlaceDialogModule,
    NewAccountModule

  ]
})

export class AdminModule { }
