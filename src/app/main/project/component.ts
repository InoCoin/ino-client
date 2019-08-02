import { Component, ChangeDetectionStrategy, PLATFORM_ID, Inject, OnInit, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { isPlatformBrowser } from '@angular/common';

import { Categories, Environment } from 'src/globals/config';
import { GalleryDialog } from 'src/app/shared/gallery-dialog';
import { SocketProvider, MapProvider, VoteProvider, AccountProvider } from 'src/app/providers';
import { BoostDialog } from 'src/app/shared/boost-dialog';

declare const FB, twttr;

@Component({
  selector: 'project-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectComponent implements OnInit, OnDestroy, AfterViewInit {

  update;
  project;

  categories = Categories;
  api_url = Environment.api_url;
  @ViewChild('copy', { static: false }) copy;

  constructor(
    ActivatedRoute: ActivatedRoute,
    private AccountProvider: AccountProvider,
    private MatDialog: MatDialog,
    private SocketProvider: SocketProvider,
    private MapProvider: MapProvider,
    private VoteProvider: VoteProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private Router: Router,
    private MatSnackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.project = ActivatedRoute.snapshot.data.project;
  }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      this.update = this.SocketProvider.updateProject.subscribe((data) => {
        let up = Object.assign({}, data);

        if (this.project._id == up._id) {

          delete up._id;

          const keys = Object.keys(up);
          const user = this.MapProvider.get('user');

          keys.forEach((k) => {

            if (k == 'follow') {

              if (user && up[k].userId == user._id) {

                up[k].action ? this.project.isFollowed = true : this.project.isFollowed = false;
              }

              up[k].action ? this.project.followersSize++ : this.project.followersSize--;
              return;

            }

            this.project[k] = up[k];

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

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      twttr.widgets.load();
    }
  }

  onVote() {

    if (this.MapProvider.get('user') == null) {
      return this.Router.navigate(['/user/login']);
    }

    return this.VoteProvider.post({
      projectId: this.project._id
    }).subscribe();

  }

  getFundsLength() {
    if (this.project.fundsLength > 0) {
      return `Bosted ${this.project.fundsLength} ${this.project.fundsLength == 1 ? 'time' : 'times'}`;
    }
    return `Nobody sponsored the project`;
  }

  onOpenGallery() {
    this.MatDialog.open(GalleryDialog, {
      data: {
        gallery: this.project.gallery
      },
      panelClass: 'gallery'
    });
  }

  onSendCoins() {
    if (this.MapProvider.get('user') == null) {
      return this.Router.navigate(['/user/login']);
    }

    if (this.AccountProvider.getBalance() == 0) {
      return alert('You don\'t have any ino coins, try again later...');
    }

    let dialogRef = this.MatDialog.open(BoostDialog, {
      data: {
        project: this.project
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

      }
    });
  }

  share() {
    const url = `https://twitter.com/intent/tweet?url=${Environment.api_url}/project/${this.project._id}&text=${this.project.title}`;
    FB.ui({
      method: 'share',
      href: url,
    }, function (response) { });
  }

  shareTwitter() {
    const url = `https://twitter.com/intent/tweet?url=${Environment.api_url}/project/${this.project._id}&text=${this.project.title}`;
    window.open(url, 'Twitter window', "width=500,height=400,fullscreen=0");
    return false;
  }

  copyLink() {
    const selection = window.getSelection();
    const range = document.createRange();
    const element = this.copy.nativeElement;

    range.setStartBefore(element);
    range.setEndAfter(element);

    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');
    this.openSnackBar(`Project link is copied in clipboard !`);
  }


  openSnackBar(message: string) {

    const instance = this.MatSnackBar.open(message, '', {
      duration: 4000
    });

  }

}
