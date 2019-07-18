import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AccountPlaceProvider, SocketProvider, LoaderProvider } from '../../providers';

@Component({
  selector: 'new-accounts',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NewAccounts implements OnInit, OnDestroy {

  request;

  limit = 10;
  skip = 0;
  accounts = [];
  loaded = false;

  constructor(
    private LoaderProvider: LoaderProvider,
    private SocketProvider: SocketProvider,
    private AccountPlaceProvider: AccountPlaceProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.onLoadAccounts();

    if (isPlatformBrowser(this.platformId)) {

      this.request = this.SocketProvider.newAccount.subscribe((data) => {
        this.accounts.unshift(data);
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

  onLoadAccounts() {
    if (!this.loaded) {

      this.LoaderProvider.show();

      this.AccountPlaceProvider.getAdmin(this.skip, this.limit).subscribe((res: any) => {
        if (res.result) {

          this.skip += this.limit;

          if (res.result.length < this.limit) {
            this.loaded = true;
          }

          res.result.forEach((p) => {
            this.accounts.push(p);
          });

          this.ChangeDetectorRef.markForCheck();
        }
        this.LoaderProvider.hide();
      })
    }
  }

}
