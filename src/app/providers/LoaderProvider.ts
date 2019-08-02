import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class LoaderProvider {

  private timer;
  private loader: HTMLElement;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private DOCUMENT: any
  ) {
    this.loader = this.DOCUMENT.getElementById('overlayer');
  }

  show() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.loader.style.display = 'block';
    }
  }

  hide(time?) {
    if (isPlatformBrowser(this.platformId)) {
      this.timer = setTimeout(() => {
        this.loader.style.display = 'none';
        this.timer = null;
      }, time || 200);
    }
  }

}
