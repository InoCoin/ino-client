import { Component, OnInit, Inject, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material';

import { Environment } from '../../../globals/config';
import { SocketProvider, TransferState, AccountProvider, VoteProvider, ProjectProvider } from '../../providers';
import { BoostDialog } from '../../shared/boost-dialog/boost.component'

@Component({
  selector: 'project-page',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Project implements OnInit, OnDestroy {

  update;
  image;
  project;

  selected = 0;
  api_url = Environment.api_url;

  constructor(
    private ChangeDetectorRef: ChangeDetectorRef,
    private DomSanitizer: DomSanitizer,
    private Router: Router,
    private MatDialog: MatDialog,
    private ActivatedRoute: ActivatedRoute,
    private TransferState: TransferState,
    private SocketProvider: SocketProvider,
    private AccountProvider: AccountProvider,
    private ProjectProvider: ProjectProvider,
    private VoteProvider: VoteProvider,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe((params) => {
      this.ProjectProvider.getById(params.id).subscribe((res) => {
        if (res.result) {
          this.image = res.result.image;
          this.project = res.result;
          this.ChangeDetectorRef.markForCheck();
        }
      });
    });

    if (isPlatformBrowser(this.platformId)) {
      this.update = this.SocketProvider.updateProject.subscribe((data) => {
        let up = Object.assign({}, data);

        if (this.project._id == up._id) {

          delete up._id;

          const keys = Object.keys(up);
          const user = this.TransferState.get('user');

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

  onVote() {

    if (this.TransferState.get('user') == null) {
      return this.Router.navigate(['/account/login']);
    }

    if (this.AccountProvider.getBalance() == 0) {
      return alert('You don\'t have any ino coins, try again later...');
    }

    return this.VoteProvider.post({
      projectId: this.project._id
    }).subscribe((res: any) => { })

  }

  onSendCoins() {
    if (this.TransferState.get('user') == null) {
      return this.Router.navigate(['/account/login']);
    }

    if (this.AccountProvider.getBalance() == 0) {
      return alert('You don\'t have any ino coins, try again later...');
    }

    let dialogRef = this.MatDialog.open(BoostDialog, {
      width: '650px',
      data: {
        project: this.project
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

      }
    });
  }

  transform(value: string) {
    return this.DomSanitizer.bypassSecurityTrustHtml(value);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode == 39) {
      this.next();
    } else if (event.keyCode == 37) {
      this.prev();
    }
  }


  next() {
    if (this.image == this.project.image) {
      this.selected = 0;
      return this.image = this.project.gallery[this.selected].name;
    }

    if (this.selected == this.project.gallery.length - 1) {
      this.selected = 0;
      return this.image = this.project.image;
    }

    this.selected++;
    this.image = this.project.gallery[this.selected].name;

  }

  prev() {
    if (this.image == this.project.image) {
      this.selected = this.project.gallery.length - 1;
      return this.image = this.project.gallery[this.selected].name;
    }

    if (this.selected == 0) {
      this.selected = this.project.gallery.length - 1;
      return this.image = this.project.image;
    }

    this.selected--;
    this.image = this.project.gallery[this.selected].name;

  }

}
