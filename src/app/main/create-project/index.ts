import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { EditorModule } from '@tinymce/tinymce-angular';

import { CreateProjectComponent } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { MenuModule } from 'src/app/shared/menu-component';
import { LoginDialogModule, LoginDialog } from 'src/app/shared/login-dialog';
import { EmbedVIdeoDialogModule, EmbedVIdeoDialog } from 'src/app/shared/embed-video-dialog';
import { SafeHTMLPipeModule } from 'src/app/pipes/safe-html.module';
import { SuccessDialogModule, SuccessDialog } from 'src/app/shared/success-dialog';
import { AuthGuardProvider } from 'src/app/guards';
import { ProjectResolver } from 'src/app/resolvers/ProjectResolver';

@NgModule({
  declarations: [
    CreateProjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreateProjectComponent
      },
      {
        path: ':key',
        component: CreateProjectComponent,
        canActivate: [ AuthGuardProvider ],
        resolve: {
          project: ProjectResolver
        }
      },
    ]),
    MatButtonModule,
    MatRippleModule,
    MatDialogModule,
    EditorModule,
    LazyImageModule,
    MenuModule,
    LoginDialogModule,
    EmbedVIdeoDialogModule,
    SafeHTMLPipeModule,
    SuccessDialogModule
  ],
  entryComponents: [
    LoginDialog,
    EmbedVIdeoDialog,
    SuccessDialog
  ]

})

export class CreateProjectModule { }
