import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'reset-success-dialog-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ResetSuccessDialog {

  constructor(
    private Router: Router,
    private MatDialogRef: MatDialogRef<ResetSuccessDialog>,
  ) { }

  close() {
    this.MatDialogRef.close();
  }

  openLoginDialog(){
    this.close();
    setTimeout(() => {
      this.Router.navigateByUrl('/user/login');
    }, 100);
  }

}
