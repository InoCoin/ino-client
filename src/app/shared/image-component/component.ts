import { Component, ViewChild, Input, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
  selector: 'image-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ImageComponent {

  @Input('src') src: string;
  @Input('height') height: number;
  @ViewChild('image', { static: true }) image: ElementRef;

  constructor() { }

  onImageLoad() {
    const classlist = this.image.nativeElement.classList;
    classlist.add('loaded')
  }

}
