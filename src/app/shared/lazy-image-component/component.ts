import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID, OnChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { intersectionObserver } from './intersection-observer';

@Component({
  selector: 'lazy-image-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LazyImageComponent implements AfterViewInit, OnChanges {

  img;

  @Input('src') src: string;
  @Input('width') width: string;
  @Input('height') height: string;
  @Input('objectFit') objectFit: string;
  @Input('verticalAlign') verticalAlign: string;

  @ViewChild('container', {
    static: false
  }) container: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {

    const style = this.container.nativeElement.style;
    style.width = this.width;
    style.height = this.height;

    if (isPlatformBrowser(this.platformId)) {

      intersectionObserver.observe(this.container.nativeElement, this.loaded.bind(this)).catch(() => {
        this.loaded();
      });

    }
  }

  loaded() {
    if (isPlatformBrowser(this.platformId)) {
      const img = new Image();
      img.src = this.src;
      img.onload = this.onload.bind(this, img);
      img.alt = 'lazy load image';
      img.style.objectFit = this.objectFit || 'unset';
      img.style.width = this.width;
      img.style.height = this.height;
      img.style.display = 'none';
      img.style.verticalAlign = this.verticalAlign || 'unset';

      this.img = img;
      this.container.nativeElement.append(img);
    }
  }

  onload(img) {
    if (isPlatformBrowser(this.platformId)) {
      img.style.display = 'block';
    }
  }

  ngOnChanges(changes) {
    const { src } = changes;
    if (src && this.img) {
      this.img.src = src.currentValue;
    }
  }

}
