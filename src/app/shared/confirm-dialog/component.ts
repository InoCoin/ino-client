import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'confirm-new-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})

export class ConfirmDialog {

  constructor(
    public MatDialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onSubmit(bool: boolean) {
    this.MatDialogRef.close(bool)
  }

}
