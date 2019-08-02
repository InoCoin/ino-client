import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDialogModule, MatSnackBarModule } from '@angular/material';

import { ProjectComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { ProjectResolver } from 'src/app/resolvers/ProjectResolver';
import { SafeHTMLPipeModule } from 'src/app/pipes/safe-html.module';
import { CopyModule } from 'src/app/directives/copy';
import { GalleryDialogModule, GalleryDialog } from 'src/app/shared/gallery-dialog';
import { BoostDialog, BoostDialogModule } from 'src/app/shared/boost-dialog';

@NgModule({
  declarations: [
    ProjectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: ':key',
      component: ProjectComponent,
      resolve: {
        project: ProjectResolver
      }
    }]),
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    GalleryDialogModule,
    BoostDialogModule,
    LazyImageModule,
    SafeHTMLPipeModule,
    CopyModule
  ],
  entryComponents: [
    GalleryDialog,
    BoostDialog
  ]
})

export class ProjectModule { }
