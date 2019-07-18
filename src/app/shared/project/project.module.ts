import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDialog } from './project.component';
import { MatButtonModule, MatIconModule, MatDialogModule } from '@angular/material'

import { BoostDialogModule } from '../boost-dialog/boost.module'
import { BoostDialog } from '../boost-dialog/boost.component'

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatDialogModule,

    BoostDialogModule
  ],
  declarations: [
    ProjectDialog
  ],
  entryComponents: [
    BoostDialog
  ],
  exports: [
    ProjectDialog
  ]
})

export class ProjectDialogModule { }
