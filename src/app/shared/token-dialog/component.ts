import { Component, ChangeDetectionStrategy, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { UserProvider } from '../../providers'

@Component({
  selector: 'token-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TokenDialog implements OnInit {

  result;

  constructor(
    private Router: Router,
    private UserProvider: UserProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private MatDialogRef: MatDialogRef<TokenDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.UserProvider.postActivation(this.data.token).subscribe((res) => {
      this.result = res;
      this.Router.navigateByUrl('/');
      return this.ChangeDetectorRef.markForCheck();
    });
  }

  close() {
    this.MatDialogRef.close();
  }

}
