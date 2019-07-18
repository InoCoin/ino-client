import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material';
import { isPlatformBrowser } from '@angular/common';
import { flatMap } from 'rxjs/operators';

import { ProjectProvider, SocketProvider, TransferState, FileProvider } from '../../providers';
import { ProjectDialog } from '../../shared/project-dialog/project.component';

@Component({
  selector: 'projects',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Projects implements OnInit, OnDestroy {

  receive;
  deleteProject;

  limit = 6;
  skip = 0;
  projects = [];
  loaded = false;

  constructor(
    public MatDialog: MatDialog,
    private ProjectProvider: ProjectProvider,
    private SocketProvider: SocketProvider,
    private TransferState: TransferState,
    private FileProvider: FileProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.onLoadProject();

    if (isPlatformBrowser(this.platformId)) {

      this.receive = this.SocketProvider.receiveProject.subscribe((data) => {

        const user = this.TransferState.get('user');

        if (user._id == data.user._id) {
          this.skip++;
          this.projects.unshift(data);
          this.ChangeDetectorRef.markForCheck();
        }

      })

      this.deleteProject = this.SocketProvider.deleteProject.subscribe((data) => {

        for (let i = 0; i < this.projects.length; i++) {
          if (data._id == this.projects[i]._id) {
            this.projects.splice(i, 1);
            this.skip--;
            this.ChangeDetectorRef.markForCheck();
          }
        }

      })
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.receive) {
      this.receive.unsubscribe();
    }
    if (isPlatformBrowser(this.platformId) && this.deleteProject) {
      this.deleteProject.unsubscribe();
    }
  }

  onLoadProject() {
    if (!this.loaded) {
      this.ProjectProvider.getUserProjects(this.skip, this.limit).subscribe((res: any) => {
        if (res.result) {

          this.skip += this.limit;

          if (res.result.length < this.limit) {
            this.loaded = true;
          }

          res.result.forEach((p) => {
            this.projects.push(p);
          });

          this.ChangeDetectorRef.markForCheck();
        }
      })
    }
  }

  onAddProject() {
    let dialogRef = this.MatDialog.open(ProjectDialog, {
      width: '650px',
      data: {
        content: '',
        title: '',
        address: '',
        gallery: [],
        image: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.title.length > 0 && result.content.length > 0 && result.address.length > 0 && result.image != null && result.gallery.length > 0) {
        this.ProjectProvider.post({
          title: result.title,
          content: result.content,
          address: result.address,
          rewards: result.rewards
        }).subscribe((res: any) => {
          if (res.result && result.image instanceof File) {

            const formData: FormData = new FormData();
            const image = result.image;

            formData.append('uploads', image, image.name);

            this.FileProvider.postImages(formData, res.result._id).pipe(flatMap(() => {

              const galleryForm: FormData = new FormData();

              result.gallery.forEach((photo) => {
                galleryForm.append('gallery[]', photo, photo.name);
              });

              return this.FileProvider.postGallery(galleryForm, res.result._id, true);

            })).subscribe();

          }
        })
      }
    });
  }

  onDelete(index: number) {
    this.ProjectProvider.put(this.projects[index]._id, {
      active: false
    }).subscribe((res: any) => {
      if (res.result) {

      }
    });
  }

}
