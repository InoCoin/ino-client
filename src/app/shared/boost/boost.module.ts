import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoostComponent } from './boost.component';
import { MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material'


@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  declarations: [
    BoostComponent
  ],
  exports: [
    BoostComponent
  ]
})

export class BoostModule { }
