import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProjectComponent } from './component';
import { LazyImageModule } from '../lazy-image-component';
import { MatButtonModule, MatDialogModule, MatCheckboxModule } from '@angular/material';
import { ConfirmDialogModule, ConfirmDialog } from '../confirm-dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    LazyImageModule,
    ConfirmDialogModule
  ],
  declarations: [
    ProjectComponent
  ],
  entryComponents: [
    ConfirmDialog
  ],
  exports: [
    ProjectComponent
  ]
})

export class ProjectModule { }
