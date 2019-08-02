import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeHTML } from './safe-html';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        SafeHTML
    ],
    exports: [
        SafeHTML
    ]
})

export class SafeHTMLPipeModule { }