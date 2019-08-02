import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatRippleModule } from '@angular/material';

import { ScrollerComponent } from './component';
import { LazyImageModule } from '../lazy-image-component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatRippleModule,
    LazyImageModule
  ],
  declarations: [
    ScrollerComponent
  ],
  exports: [
    ScrollerComponent
  ]
})

export class ScrollerModule { }
