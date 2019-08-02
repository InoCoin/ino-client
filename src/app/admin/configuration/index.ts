import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';

import { ConfigurationComponent } from './component';
import { UserModule } from 'src/app/shared/user-component';

@NgModule({
  declarations: [
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ConfigurationComponent,
    }]),
    MatButtonModule,
    UserModule
  ]
})

export class ConfigurationModule { }
