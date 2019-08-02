import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'success-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SuccessDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private MatDialogRef: MatDialogRef<SuccessDialog>,
  ) { }

  close() {
    this.MatDialogRef.close();
  }

}
