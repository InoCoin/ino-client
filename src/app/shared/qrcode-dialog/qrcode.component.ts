import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoaderProvider } from '../../providers'

import QRCode from 'qrcode'

@Component({
  selector: 'qrcode-dialog',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})

export class QrCodeDialog {

  src;
  timeOut;

  width = '';
  DELAY: number = 500;
  MAX: number = 2000

  constructor(
    public MatDialogRef: MatDialogRef<QrCodeDialog>,
    private LoaderProvider: LoaderProvider,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.generate(500);
  }

  onChangeWidth() {

    if (this.timeOut != null) {
      clearTimeout(this.timeOut);
    }

    this.timeOut = setTimeout(
      () => {

        const w = Number(this.width);

        if (this.width.length > 0 && w != NaN && w <= this.MAX ) {
          this.LoaderProvider.show();
          this.generate(this.width);
        }
      },
      this.DELAY
    );
  }

  generate(width) {

    const opts = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: width,
      rendererOpts: {
        quality: 1
      }
    }

    QRCode.toDataURL(this.data.place.key, opts, (err, url) => {
      if (err) {
        console.log(err)
      }
      this.src = url;
      this.LoaderProvider.hide();
    })
  }

}
