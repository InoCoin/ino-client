import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImageComponent
  ],
  exports: [
    ImageComponent
  ]
})

export class ImageModule { }
