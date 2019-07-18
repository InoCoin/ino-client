import { Component, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PrivateKeyDialog } from '../private-key/privatekey.component'

@Component({
  selector: 'keystore-dialog',
  templateUrl: './keystore.component.html',
  styleUrls: ['./keystore.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class KeystoreDialog {

  keyStore = '';

  constructor(
    public MatDialogRef: MatDialogRef<KeystoreDialog>,
    private MatDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.keyStore = JSON.stringify(data.keyStore);
  }

  exportPrivate() {
    let dialogRef = this.MatDialog.open(PrivateKeyDialog, {
      width: '650px',
      data: {
        keyStore: this.data.keyStore
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

      }
    });
  }

  download() {

    let element = document.createElement('a');

    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(this.keyStore));
    element.setAttribute('download', `0x${this.data.keyStore.address}.json`);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

}
