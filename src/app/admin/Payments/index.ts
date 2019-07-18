import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { PaymentProvider, SocketProvider } from '../../providers';

@Component({
  selector: 'configuration',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Payments implements OnInit, OnDestroy {

  request;

  limit = 5;
  skip = 0;
  payments = [];
  loaded = false;

  constructor(
    private SocketProvider: SocketProvider,
    private PaymentProvider: PaymentProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.onLoadPayments();

    if (isPlatformBrowser(this.platformId)) {
      this.request = this.SocketProvider.receiveRequest.subscribe((data) => {
        this.payments.unshift(data);
        this.skip++;
        this.ChangeDetectorRef.markForCheck();
      })

    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.request) {
      this.request.unsubscribe();
    }
  }

  onLoadPayments() {
    if (!this.loaded) {
      this.PaymentProvider.getAdmin(this.skip, this.limit).subscribe((res: any) => {
        if (res.result) {

          this.skip += this.limit;

          if (res.result.length < this.limit) {
            this.loaded = true;
          }

          res.result.forEach((p) => {
            this.payments.push(p);
          });

          this.ChangeDetectorRef.markForCheck();
        }
      })
    }
  }

}
