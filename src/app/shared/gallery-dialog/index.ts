import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material'

import { GalleryDialog } from './component';
import { LazyImageModule } from '../lazy-image-component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    LazyImageModule
  ],
  declarations: [
    GalleryDialog
  ],
  exports: [
    GalleryDialog
  ]
})

class GalleryDialogModule { }

export {
  GalleryDialog,
  GalleryDialogModule
}