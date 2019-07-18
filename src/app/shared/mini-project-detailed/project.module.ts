import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MiniProjectDetailedComponent } from './project.component';
import { MatButtonModule, MatIconModule, MatCardModule, MatDialogModule } from '@angular/material'
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ProjectDialogModule } from '../project/project.module'
import { ProjectDialog } from '../project/project.component'

import { BoostDialogModule } from '../boost-dialog/boost.module'
import { BoostDialog } from '../boost-dialog/boost.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,

    ProjectDialogModule,
    BoostDialogModule,

    MatSnackBarModule
  ],
  declarations: [
    MiniProjectDetailedComponent
  ],
  entryComponents: [
    ProjectDialog,
    BoostDialog
  ],
  exports: [
    MiniProjectDetailedComponent
  ]
})

export class MiniProjectDetailedDetailedModule { }
