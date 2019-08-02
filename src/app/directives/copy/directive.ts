import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Directive({
    selector: '[copy]'
})

export class CopyDirective implements OnInit {

    @Input('copy') name: string;

    constructor(
        private MatSnackBar: MatSnackBar,
        private ElementRef: ElementRef
    ) { }

    ngOnInit() {
        if (this.name) {
            this.name = `${this.name[0].toUpperCase()}${this.name.slice(1, this.name.length)}`;
        }
    }

    @HostListener('click') onClick() {

        const selection = window.getSelection();
        const range = document.createRange();
        const element = this.ElementRef.nativeElement;
        const address = element.innerHTML.slice(0, 32);

        range.setStartBefore(element);
        range.setEndAfter(element);

        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('copy');
        this.openSnackBar(`${this.name} ${address}... is copied !`);

    }

    openSnackBar(message: string) {

        const instance = this.MatSnackBar.open(message, '', {
            duration: 4000
        });

    }

}