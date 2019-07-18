import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material'

import { MODULE_COMPONENTS, MODULE_ROUTES } from './home.routes';

import { MiniProjectDetailedDetailedModule } from '../shared/mini-project-detailed/project.module'

import { BoostDialogModule } from '../shared/boost-dialog/boost.module'
import { BoostDialog } from '../shared/boost-dialog/boost.component'

@NgModule({
  declarations: [
    MODULE_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MODULE_ROUTES),
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,

    MiniProjectDetailedDetailedModule,
    BoostDialogModule,
  ],
  entryComponents: [
    BoostDialog
  ]
})

export class HomeModule {}
