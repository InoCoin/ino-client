import { Component, OnInit, Inject, OnDestroy, Input, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { MatDialog, MatSnackBar } from '@angular/material';

import { ProjectProvider, VoteProvider, TransferState, AccountProvider, SocketProvider } from '../../providers';
import { ProjectDialog } from '../project/project.component'
import { BoostDialog } from '../boost-dialog/boost.component'
import { Environment } from '../../../globals/config';

@Component({
  selector: 'mini-project-detailed-component',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MiniProjectDetailedComponent implements OnInit, OnDestroy {

  update;
  api_url = Environment.api_url;

  @Input('project') project;
  @Input('index') index;
  @ViewChild('address') address;

  constructor(
    private VoteProvider: VoteProvider,
    private TransferState: TransferState,
    private AccountProvider: AccountProvider,
    private MatDialog: MatDialog,
    private Router: Router,
    private ChangeDetectorRef: ChangeDetectorRef,
    private SocketProvider: SocketProvider,
    private MatSnackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
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
      });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.update) {
      this.update.unsubscribe();
    }
  }

  onViewProject() {
    let dialogRef = this.MatDialog.open(ProjectDialog, {
      width: '600px',
      panelClass: 'project',
      data: {
        project: this.project
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

      }
    });
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
