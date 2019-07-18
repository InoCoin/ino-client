import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BoostDialog } from './boost.component';
import { MatButtonModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [
    BoostDialog
  ],
  exports: [
    BoostDialog
  ]
})

export class BoostDialogModule { }
