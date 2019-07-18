import { Component, OnInit, Inject, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Environment } from '../../../globals/config';
import { SocketProvider, TransferState, AccountProvider, VoteProvider } from '../../providers';
import { BoostDialog } from '../boost-dialog/boost.component'

@Component({
  selector: 'project-dialog',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectDialog implements OnInit, OnDestroy {

  update;
  image;

  selected = 0;
  api_url = Environment.api_url;

  constructor(
    private ChangeDetectorRef: ChangeDetectorRef,
    private DomSanitizer: DomSanitizer,
    private Router: Router,
    private MatDialog: MatDialog,
    public MatDialogRef: MatDialogRef<ProjectDialog>,
    private TransferState: TransferState,
    private SocketProvider: SocketProvider,
    private AccountProvider: AccountProvider,
    private VoteProvider: VoteProvider,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.image = this.data.project.image

    if (isPlatformBrowser(this.platformId)) {
      this.update = this.SocketProvider.updateProject.subscribe((data) => {
        this.ChangeDetectorRef.markForCheck();
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
      this.MatDialogRef.close();
      return setTimeout(() => {
        return this.Router.navigate(['/account/login']);
      }, 400);
    }

    if (this.AccountProvider.getBalance() == 0) {
      return alert('You don\'t have any ino coins, try again later...');
    }

    return this.VoteProvider.post({
      projectId: this.data.project._id
    }).subscribe((res: any) => { })

  }

  onSendCoins() {
    if (this.TransferState.get('user') == null) {
      this.MatDialogRef.close();
      return setTimeout(() => {
        return this.Router.navigate(['/account/login']);
      }, 400);
    }

    if (this.AccountProvider.getBalance() == 0) {
      return alert('You don\'t have any ino coins, try again later...');
    }

    let dialogRef = this.MatDialog.open(BoostDialog, {
      width: '650px',
      data: {
        project: this.data.project
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
    if (this.image == this.data.project.image) {
      this.selected = 0;
      return this.image = this.data.project.gallery[this.selected].name;
    }

    if (this.selected == this.data.project.gallery.length - 1) {
      this.selected = 0;
      return this.image = this.data.project.image;
    }

    this.selected++;
    this.image = this.data.project.gallery[this.selected].name;

  }

  prev() {
    if (this.image == this.data.project.image) {
      this.selected = this.data.project.gallery.length - 1;
      return this.image = this.data.project.gallery[this.selected].name;
    }

    if (this.selected == 0) {
      this.selected = this.data.project.gallery.length - 1;
      return this.image = this.data.project.image;
    }

    this.selected--;
    this.image = this.data.project.gallery[this.selected].name;

  }

}
