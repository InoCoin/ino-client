import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule, MatDialogModule } from '@angular/material'
import { CopyModule } from '../../directives/copy';
import { EmbedVIdeoDialog } from './component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CopyModule,
    
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule
  ],
  declarations: [
    EmbedVIdeoDialog
  ],
  exports: [
    EmbedVIdeoDialog
  ]
})

class EmbedVIdeoDialogModule { }

export {
  EmbedVIdeoDialog,
  EmbedVIdeoDialogModule
}