import { Component, Inject, OnInit, OnDestroy, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { SocketProvider, AccountPlaceProvider } from '../../providers';

@Component({
  selector: 'new-account-component',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NewAccount implements OnInit, OnDestroy{

  update;

  @Input('account') account;
  @ViewChild('address') address;

  constructor(
    private ChangeDetectorRef: ChangeDetectorRef,
    private SocketProvider: SocketProvider,
    private AccountPlaceProvider: AccountPlaceProvider,
    private MatSnackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.update = this.SocketProvider.updateAccount.subscribe((data) => {

        if (this.account._id == data.itemId) {

          let item = data.data


          delete data.itemId;

          let keys = Object.keys(item);

          keys.forEach((k) => {
            this.account[k] = item[k];
          });

          this.ChangeDetectorRef.markForCheck();
        }
      })
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.update) {
      this.update.unsubscribe();
    }
  }

  onChange() {
    this.AccountPlaceProvider.put(this.account._id, {
      status: this.account.status
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
    }, 2000)
  }

}
