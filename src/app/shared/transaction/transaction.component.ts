import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Environment } from '../../../globals/config';

@Component({
  selector: 'transaction-component',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TransactionComponent {


  api_url = Environment.api_url;

  @Input('transaction') transaction;

  constructor(private MatSnackBar: MatSnackBar) { }

  copy(element) {

    const selection = window.getSelection();
    const range = document.createRange();

    range.setStartBefore(element);
    range.setEndAfter(element);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand("copy")

    this.MatSnackBar.open(`Address is copied !`);

    setTimeout(() => {
      this.MatSnackBar.dismiss();
    }, 2000)
  }

}
