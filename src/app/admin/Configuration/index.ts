import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { isPlatformBrowser } from '@angular/common';

import { ConfigurationProvider, UserProvider, SocketProvider } from '../../providers';

@Component({
  selector: 'configuration',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Configuration implements OnInit, OnDestroy {

  amount;
  change;

  limit = 5;
  skip = 0;
  users = [];
  loaded = false;

  constructor(
    private ConfigurationProvider: ConfigurationProvider,
    private UserProvider: UserProvider,
    private SocketProvider: SocketProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private MatSnackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {

    this.ConfigurationProvider.get().subscribe((res) => {
      if (res.result) {
        this.amount = res.result.price.toFixed(2);
        this.ChangeDetectorRef.markForCheck();
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.change = this.SocketProvider.updateConf.subscribe((data) => {
        this.amount = data.price.toFixed(2);
        this.ChangeDetectorRef.markForCheck();
      })

    }

    this.onLoadUsers();

  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.change) {
      this.change.unsubscribe();
    }
  }

  onLoadUsers() {
    if (!this.loaded) {
      this.UserProvider.getAdmin(this.skip, this.limit).subscribe((res: any) => {
        if (res.result) {

          this.skip += this.limit;

          if (res.result.length < this.limit) {
            this.loaded = true;
          }

          res.result.forEach((u) => {
            this.users.push(u);
          });

          this.ChangeDetectorRef.markForCheck();
        }
      })
    }
  }

  onSubmit() {
    this.ConfigurationProvider.put({
      price: Number(this.amount)
    }).subscribe((res) => {
      if (res.result) {
        return this.openSnackBar('Configuration is changed successful !')
      }
      return this.openSnackBar('Something went wrong, try again later !')
    })
  }

  openSnackBar(message: string) {
    this.MatSnackBar.open(message);
    setTimeout(() => {
      this.MatSnackBar.dismiss();
    }, 2000)
  }

}
