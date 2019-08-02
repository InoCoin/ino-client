import { Component, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Environment } from '../../../globals/config';

@Component({
  selector: 'gallery-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GalleryDialog {

  index = 0;
  api_url = Environment.api_url;

  constructor(
    private ChangeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode == 39) {
      this.move(true);
    } else if (event.keyCode == 37) {
      this.move(false);
    }
  }


  onLoad(img) {
    if (img.width >= img.height) {
      img.className = 'responsive-width';
    } else {
      img.className = 'responsive-height';
    }
  }

  move(bool) {
    if (bool) {
      if (this.data.gallery.length - 1 > this.index) {
        this.index++;
      } else {
        this.index = 0;
      }
    } else {
      if (this.index > 0) {
        this.index--;
      } else {
        this.index = this.data.gallery.length - 1;
      }
    }
    this.ChangeDetectorRef.markForCheck();
  }

}
