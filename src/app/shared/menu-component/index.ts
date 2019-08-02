import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { MenuComponent } from './component';
import { LazyImageModule } from '../lazy-image-component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    LazyImageModule
  ],
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent
  ]
})

export class MenuModule { }
