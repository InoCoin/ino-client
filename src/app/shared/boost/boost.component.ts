import { Component, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Environment } from '../../../globals/config';

@Component({
  selector: 'boost-component',
  templateUrl: './boost.component.html',
  styleUrls: ['./boost.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BoostComponent {


  api_url = Environment.api_url;

  @Input('boost') boost;
  @ViewChild('address') address;

  constructor(private MatSnackBar: MatSnackBar) { }

  copy() {

    const selection = window.getSelection();
    const range = document.createRange();

    range.setStartBefore(this.address.nativeElement);
    range.setEndAfter(this.address.nativeElement);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand("copy")

    this.MatSnackBar.open(`Address is copied ${this.boost.project.address} !`);

    setTimeout(() => {
      this.MatSnackBar.dismiss();
    }, 2000)
  }

}
