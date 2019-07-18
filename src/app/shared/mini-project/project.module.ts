import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MiniProjectComponent } from './project.component';
import { MatButtonModule, MatIconModule, MatCardModule, MatSnackBarModule } from '@angular/material'

import { ProjectModule } from '../project-dialog/project.module';
import { ProjectDialog } from '../project-dialog/project.component';

import { ConfirmDialogModule } from '../confirm-dialog/confirm.module';
import { ConfirmDialog } from '../confirm-dialog/confirm.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,

    ProjectModule,
    ConfirmDialogModule
  ],
  declarations: [
    MiniProjectComponent
  ],
  entryComponents:[
    ProjectDialog,
    ConfirmDialog
  ],
  exports: [
    MiniProjectComponent
  ]
})

export class MiniProjectModule { }
