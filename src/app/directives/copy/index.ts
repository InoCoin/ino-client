import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material'

import { CopyDirective } from './directive';

@NgModule({
    imports: [
        CommonModule,
        MatSnackBarModule
    ],
    declarations: [
        CopyDirective
    ],
    exports: [
        CopyDirective
    ]
})

export class CopyModule { }