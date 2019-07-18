import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material'

import { User } from './user.component';

@NgModule({
  imports: [
    CommonModule,

    MatSelectModule
  ],
  declarations: [
    User
  ],
  exports: [
    User
  ]
})

export class UserModule { }
