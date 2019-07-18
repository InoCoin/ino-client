import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { MatDialog } from '@angular/material';

import { PlaceProvider, SocketProvider, LoaderProvider } from '../../providers';
import { PlaceDialog } from '../../shared/place-dialog/place.component';

@Component({
  selector: 'places',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Places implements OnInit, OnDestroy {

  request;
  deletePlace;

  limit = 10;
  skip = 0;
  places = [];
  loaded = false;

  constructor(
    public MatDialog: MatDialog,
    private PlaceProvider: PlaceProvider,
    private LoaderProvider: LoaderProvider,
    private SocketProvider: SocketProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.onLoadPlaces();

    if (isPlatformBrowser(this.platformId)) {

      this.request = this.SocketProvider.newPlace.subscribe((data) => {
        this.places.unshift(data);
        this.skip++;
        this.ChangeDetectorRef.markForCheck();
      })

      this.deletePlace = this.SocketProvider.deletePlace.subscribe((data) => {

        for (let i = 0; i < this.places.length; i++) {
          if (data.placeId == this.places[i]._id) {
            this.places.splice(i, 1);
            this.skip--;
            this.ChangeDetectorRef.markForCheck();
          }
        }

      })

    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.request) {
      this.request.unsubscribe();
    }
    if (isPlatformBrowser(this.platformId) && this.deletePlace) {
      this.deletePlace.unsubscribe();
    }
  }

  onAddPlace() {
    let dialogRef = this.MatDialog.open(PlaceDialog, {
      width: '650px',
      data: {
        name: '',
        address: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.LoaderProvider.show();
        this.PlaceProvider.post(result).subscribe((res) => {
          this.LoaderProvider.hide();
        })
      }
    });
  }

  onLoadPlaces() {
    if (!this.loaded) {
      this.PlaceProvider.getAdmin(this.skip, this.limit).subscribe((res: any) => {
        if (res.result) {

          this.skip += this.limit;

          if (res.result.length < this.limit) {
            this.loaded = true;
          }

          res.result.forEach((p) => {
            this.places.push(p);
          });

          this.ChangeDetectorRef.markForCheck();
        }
      })
    }
  }

}
