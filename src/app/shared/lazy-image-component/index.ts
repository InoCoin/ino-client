import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyImageComponent } from './component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LazyImageComponent
  ],
  exports: [
    LazyImageComponent
  ]
})

export class LazyImageModule { }
