import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { ProjectProvider, SocketProvider } from '../../providers';

@Component({
  selector: 'projects',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Projects implements OnInit, OnDestroy {

  receive;

  limit = 6;
  skip = 0;
  projects = [];
  loaded = false;

  constructor(
    private ProjectProvider: ProjectProvider,
    private SocketProvider: SocketProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.onLoadProject();

    if (isPlatformBrowser(this.platformId)) {

      this.receive = this.SocketProvider.receiveProject.subscribe((data) => {

        this.skip++;
        this.projects.unshift(data);
        this.ChangeDetectorRef.markForCheck();

      })
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.receive) {
      this.receive.unsubscribe();
    }
  }


  onLoadProject() {
    if (!this.loaded) {
      this.ProjectProvider.getMany(this.skip, this.limit).subscribe((res: any) => {
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

}
