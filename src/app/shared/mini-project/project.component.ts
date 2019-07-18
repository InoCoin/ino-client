import { Component, Inject, OnInit, OnDestroy, ViewChild, Input, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Output, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { isPlatformBrowser } from '@angular/common';
import { flatMap } from 'rxjs/operators';

import { ProjectProvider, SocketProvider, TransferState, FileProvider } from '../../providers';
import { ProjectDialog } from '../project-dialog/project.component';
import { ConfirmDialog } from '../confirm-dialog/confirm.component';
import { Environment } from '../../../globals/config';

@Component({
  selector: 'mini-project-component',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MiniProjectComponent implements OnInit, OnDestroy {

  update;
  api_url = Environment.api_url;

  loaded = true;
  @Input('project') project;
  @Input('index') index;
  @Output('delete') delete = new EventEmitter();
  @ViewChild('address') address;

  constructor(
    public MatDialog: MatDialog,
    private ChangeDetectorRef: ChangeDetectorRef,
    private ProjectProvider: ProjectProvider,
    private SocketProvider: SocketProvider,
    private FileProvider: FileProvider,
    private MatSnackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.update = this.SocketProvider.updateProject.subscribe((data) => {
        if (this.project._id == data._id) {

          delete data._id;

          let keys = Object.keys(data);

          keys.forEach((k) => {
            this.project[k] = data[k];
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

  onEdit() {
    let dialogRef = this.MatDialog.open(ProjectDialog, {
      width: '650px',
      data: {
        content: this.project.content,
        title: this.project.title,
        address: this.project.address,
        image: this.project.image,
        gallery: this.project.gallery,
        rewards: [...this.project.rewards]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.title.length > 0 && result.content.length > 0 && result.address.length > 0 && result.image != null && result.gallery.length > 0) {

        let gallery = result.gallery;
        delete result.gallery;

        this.loaded = false;
        this.ProjectProvider.put(this.project._id, result).subscribe((res: any) => {
          this.loaded = true;
          this.ChangeDetectorRef.markForCheck();

          if (result.image instanceof File) {

            const formData: FormData = new FormData();
            const image = result.image;

            formData.append('uploads', image, image.name);

            return this.FileProvider.postImages(formData, this.project._id).subscribe((res: any) => { });

          }

          let newPhotos = [];

          gallery.forEach((i) => {
            if (i instanceof File) {
              newPhotos.push(i);
            }
          })

          if (newPhotos.length > 0 && result.removedPhotos.length > 0) {
            this.deletePhotos(result.removedPhotos, false).pipe(flatMap((r) => {
              return this.uploadPhotos(newPhotos, true);
            })).subscribe((r) => { })
            return;
          }

          if (result.removedPhotos.length > 0) {
            this.deletePhotos(result.removedPhotos, true).subscribe((r) => { })
          }

          if (newPhotos.length > 0) {
            this.uploadPhotos(newPhotos, true).subscribe((r) => { })
          }

        })
      }
    });
  }

  deletePhotos(removedPhotos, update) {
    return this.ProjectProvider.deletePhotos(this.project._id, removedPhotos, update);
  }

  uploadPhotos(newPhotos, update) {
    const galleryForm: FormData = new FormData();

    newPhotos.forEach((photo) => {
      galleryForm.append('gallery[]', photo, photo.name);
    });

    return this.FileProvider.postGallery(galleryForm, this.project._id, update);
  }

  onDelete() {

    let dialogRef = this.MatDialog.open(ConfirmDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit(this.index);
      }
    })
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
