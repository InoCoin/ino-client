import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
    name: 'safeHTML'
})

export class SafeHTML implements PipeTransform {

    constructor(private DomSanitizer: DomSanitizer){ }

    transform(value: string): any {
        if(value == null){
            return '';
        }
        return this.DomSanitizer.bypassSecurityTrustHtml(value);
    }
}