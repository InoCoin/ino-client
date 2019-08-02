import { Component, ChangeDetectionStrategy, HostListener, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { LoginDialog } from './shared/login-dialog';
import { UpdateProvider, UserProvider, MapProvider } from './providers';
import { ChangePasswordDialog } from './shared/change-password';
import { UserRoles } from 'src/globals/config';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: 'app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnDestroy {

  user;
  userSubscriber;
  active = false;
  show = false;
  roles = UserRoles;

  @ViewChild('menu', { static: false }) menu: ElementRef;

  constructor(
    private UpdateProvider: UpdateProvider,
    private UserProvider: UserProvider,
    private MapProvider: MapProvider,
    private Router: Router,
    private MatDialog: MatDialog,
    private ChangeDetectorRef: ChangeDetectorRef
  ) {
    this.user = this.MapProvider.get(this.MapProvider.USER);
    this.userSubscriber = this.MapProvider.setSubsription(this.MapProvider.USER).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    if (this.userSubscriber) {
      this.userSubscriber.unsubscribe();
    }
  }

  login() {
    if (this.user) {
      return this.toggle();
    }
    return this.MatDialog.open(LoginDialog);
  }

  changePassword(){
    if (this.user) {
      this.MatDialog.open(ChangePasswordDialog);
      return this.toggle();
    }
  }

  toggle() {
    this.show = !this.show;
    this.ChangeDetectorRef.markForCheck();
  }

  logOut() {
    this.UserProvider.logOut().subscribe((res) => {
      if (res.result) {
        this.user = null;
        this.toggle();
        this.Router.navigate(['/']);
      }
    });
  }

  @HostListener("document:click", ['$event']) onClick(event) {
    if (!this.menu.nativeElement.contains(event.target)) {
      this.show = false;
      this.ChangeDetectorRef.markForCheck();
    }
  }

  @HostListener("window:scroll", ['$event']) onWindowScroll(event) {
    const height = window.pageYOffset;
    if (height > 100) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

}
