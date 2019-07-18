import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


@Injectable()
export class LoaderProvider {

  private loader: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private DOCUMENT: any
  ) {
    this.loader = this.DOCUMENT.getElementById('overlayer');
  }

  show() {
    this.loader.style.display = 'block';
  }

  hide() {
    this.loader.style.display = 'none';
  }

}
