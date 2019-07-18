import { Component, Inject, OnInit, OnDestroy, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { BraintTreeUrl, PaymentMethods, ScanTx } from '../../../globals/config';
import { PaymentProvider, SocketProvider } from '../../providers';

@Component({
  selector: 'payment-component',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Payment implements OnInit, OnDestroy{

  update

  number = Number;
  braintTreeUrl = BraintTreeUrl;
  paymentMethods = PaymentMethods;
  scanTx = ScanTx;

  @Input('payment') payment;
  @ViewChild('address') address;

  constructor(
    private ChangeDetectorRef: ChangeDetectorRef,
    private PaymentProvider: PaymentProvider,
    private SocketProvider: SocketProvider,
    private MatSnackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.update = this.SocketProvider.updateRequest.subscribe((data) => {

        if (this.payment._id == data._id) {

          delete data._id;

          let keys = Object.keys(data);

          keys.forEach((k) => {
            this.payment[k] = data[k];
          });

          this.ChangeDetectorRef.markForCheck();
        }
      });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.update) {
      this.update.unsubscribe();
    }
  }

  onChange() {
    this.PaymentProvider.put(this.payment._id, {
      status: this.payment.status
    }).subscribe((res) => { })
  }

  copy() {

    const selection = window.getSelection();
    const range = document.createRange();

    range.setStartBefore(this.address.nativeElement);
    range.setEndAfter(this.address.nativeElement);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand("copy")

    this.MatSnackBar.open('Address is copied !');

    setTimeout(() => {
      this.MatSnackBar.dismiss();
    }, 2000);
  }

}
