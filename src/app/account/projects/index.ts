import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';

import { MyProjectsComponent } from './component';
import { MenuModule } from 'src/app/shared/menu-component';
import { ProjectModule } from 'src/app/shared/project-component';

@NgModule({
  declarations: [
    MyProjectsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MyProjectsComponent }]),
    MatButtonModule,
    MenuModule,
    ProjectModule
  ]
})

export class MyProjectsModule { }
