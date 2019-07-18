import { Component, Inject, OnInit, OnDestroy, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material';

import { QrCodeDialog } from '../qrcode-dialog/qrcode.component';
import { PlaceDialog } from '../place-dialog/place.component';
import { ConfirmDialog } from '../confirm-dialog/confirm.component';

import { SocketProvider, PlaceProvider, LoaderProvider } from '../../providers';

import QRCode from 'qrcode'

@Component({
  selector: 'place-component',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Place implements OnInit, OnDestroy {

  update

  @Input('place') place;
  @ViewChild('qrcode') qrcode;

  constructor(
    public MatDialog: MatDialog,
    private ChangeDetectorRef: ChangeDetectorRef,
    private SocketProvider: SocketProvider,
    private PlaceProvider: PlaceProvider,
    private LoaderProvider: LoaderProvider,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

      QRCode.toCanvas(this.qrcode.nativeElement, this.place.key, { width: 80 }, function (error) {
        if (error) console.error(error)
      })

      this.update = this.SocketProvider.updatePlace.subscribe((data) => {
        if (this.place._id == data.placeId) {

          const update = data.data;

          let keys = Object.keys(update);

          keys.forEach((k) => {
            this.place[k] = update[k];
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

  onOpenDialog() {
    let dialogRef = this.MatDialog.open(QrCodeDialog, {
      width: '650px',
      data: {
        place: this.place
      }
    });
  }

  onEdit() {
    let dialogRef = this.MatDialog.open(PlaceDialog, {
      width: '650px',
      data: {
        name: this.place.name,
        address: this.place.address
      }
    });

    dialogRef.afterClosed().subscribe((data) => {

      let update = {};

      if (!(data instanceof Object)) {
        return;
      }

      Object.keys(data).forEach((key) => {
        if (this.place[key] != data[key]) {
          update[key] = data[key];
        }
      })


      if (Object.keys(update).length > 0) {

        this.LoaderProvider.show();

        this.PlaceProvider.put(this.place._id, update).subscribe((r) => {
          this.LoaderProvider.hide();
        })
      }
    })
  }


  onDelete() {

    let dialogRef = this.MatDialog.open(ConfirmDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.LoaderProvider.show();
        this.PlaceProvider.put(this.place._id, {
          active: false
        }).subscribe(() => {
          this.LoaderProvider.hide();
        })
      }
    })
  }

}
