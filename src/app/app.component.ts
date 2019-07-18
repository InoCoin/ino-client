import { Component, Inject, PLATFORM_ID, OnInit, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { UserProvider, TransferState, LoaderProvider } from './providers'
import { isPlatformBrowser } from '@angular/common';

import { UserRoles } from '../globals/config';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

declare let ga: any;

@Component({
  selector: 'ino-app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: 'app.component.html',
  host: {
    '(window:online)': 'onlineEvent($event)',
    '(window:offline)': 'offlineEvent($event)'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {

  subscribe;

  routeIndex: any;
  userRoles = UserRoles;
  loaded = false;
  online = true;

  constructor(
    private Router: Router,
    private ChangeDetectorRef: ChangeDetectorRef,
    private UserProvider: UserProvider,
    private LoaderProvider: LoaderProvider,
    public TransferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.online = navigator.onLine
    }
  }

  ngOnInit() {

    if (this.online == false) {
      return;
    }

    this.load();

  }

  onlineEvent(event) {
    this.online = true;
    this.load();
  }

  offlineEvent($event) {
    this.online = false;
    this.Router.navigate(['/']);
    this.ChangeDetectorRef.markForCheck();
  }

  load() {
    this.LoaderProvider.show();

    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }

    this.subscribe = this.Router.events.subscribe((event: RouterEvent) => {
      if (this.loaded) {
        this.navigationInterceptor(event);
      }
    });

    this.UserProvider.getAuth()
      .subscribe((res: any) => {
        this.loaded = true;
        this.ChangeDetectorRef.markForCheck();
        this.LoaderProvider.hide();
      });
  }

  navigationInterceptor(event: RouterEvent): void {

    if (event instanceof NavigationStart) {
      this.LoaderProvider.show();
    } else if (event instanceof NavigationEnd) {

      if (isPlatformBrowser(this.platformId) && window['ga'] && ga.loaded) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }

      this.LoaderProvider.hide();
    } else if (event instanceof NavigationCancel) {
      this.LoaderProvider.hide();
    } else if (event instanceof NavigationError) {
      this.LoaderProvider.hide();
    }

  }

  onLogOut() {
    this.LoaderProvider.show();
    this.UserProvider.logOut().subscribe((res) => {
      if (res.result) {
        this.Router.navigate(['/']);
      }
      this.ChangeDetectorRef.markForCheck();
      this.LoaderProvider.hide();
    })
  }

  goToProjects() {
    this.Router.navigate(['/account', 'projects']);
  }

  goToWallet() {
    this.Router.navigate(['/account', 'wallet']);
  }


  goToConfiguration() {
    this.Router.navigate(['/admin', 'configuration']);
  }

  goToPayments() {
    this.Router.navigate(['/admin', 'payments']);
  }

  goToUpdates() {
    this.Router.navigate(['/admin', 'updates']);
  }

  goToPlaces(){
    this.Router.navigate(['/admin', 'places']);
  }

  goToNewAccounts(){
    this.Router.navigate(['/admin', 'new-accounts']);
  }
}
