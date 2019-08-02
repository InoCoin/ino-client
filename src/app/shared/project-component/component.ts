import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material';
import { isPlatformBrowser } from '@angular/common';

import { flatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProjectProvider, SocketProvider, MapProvider } from 'src/app/providers';
import { Environment, Categories, UserRoles } from '../../../globals/config';
import { ConfirmDialog } from '../confirm-dialog';

@Component({
  selector: 'project-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectComponent {

  update;
  project;
  user;
  userSubscription;

  roles = UserRoles;
  categories = Categories;
  api_url = Environment.api_url;
  @Input('data') data;
  @Input('edit') edit;
  @Input('delete') delete;

  constructor(
    private ProjectProvider: ProjectProvider,
    private SocketProvider: SocketProvider,
    private MapProvider: MapProvider,
    private MatDialog: MatDialog,
    private ChangeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.project = this.data;
    this.user = this.MapProvider.get(this.MapProvider.USER);

    if (isPlatformBrowser(this.platformId)) {

      this.update = this.SocketProvider.updateProject.subscribe((data) => {

        let up = Object.assign({}, data);

        if (this.project._id == up._id) {

          delete up._id;

          const keys = Object.keys(up);
          const user = this.MapProvider.get('user');

          keys.forEach((k) => {

            if (k == 'follow') {

              if (user && up[k].userId == user._id) {

                up[k].action ? this.project.isFollowed = true : this.project.isFollowed = false;
              }

              up[k].action ? this.project.followersSize++ : this.project.followersSize--;
              return;

            }

            this.project[k] = up[k];

          });

          this.ChangeDetectorRef.detectChanges();
        }
      });

      this.userSubscription = this.MapProvider.setSubsription(this.MapProvider.USER).subscribe((data) => {
        this.user = data;
      });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.update) {
      this.update.unsubscribe();
    }
    if (isPlatformBrowser(this.platformId) && this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  updateProject($event) {
    this.ProjectProvider.put(this.project._id, {
      finalized: this.project.finalized
    }).subscribe();
  }

  onDelete() {

    let dialogRef = this.MatDialog.open(ConfirmDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().pipe(flatMap((result) => {
      if (result) {
        return this.ProjectProvider.put(this.project._id, {
          active: false
        });
      }
      return of(false);
    })).subscribe();
  }

}
