import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { ProjectProvider, MapProvider, SocketProvider } from 'src/app/providers';

@Component({
  selector: 'my-projects-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MyProjectsComponent implements OnInit, OnDestroy{


  receive;
  deleteProject;

  page = 1;
  limit = 12;
  pages = []
  projects = [];

  constructor(
    private ChangeDetectorRef: ChangeDetectorRef,
    private ProjectProvider: ProjectProvider,
    private ActivatedRoute: ActivatedRoute,
    private SocketProvider: SocketProvider,
    private MapProvider: MapProvider,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.ActivatedRoute.queryParams.subscribe((params) => {
      this.page = params.page || this.page;
      this.onLoad();
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

      this.receive = this.SocketProvider.receiveProject.subscribe((data) => {

        const user = this.MapProvider.get('user');

        if (user._id == data.user._id) {
          this.projects.unshift(data);
          this.ChangeDetectorRef.detectChanges();
        }

      })

      this.deleteProject = this.SocketProvider.deleteProject.subscribe((data) => {

        for (let i = 0; i < this.projects.length; i++) {
          if (data._id == this.projects[i]._id) {
            this.projects.splice(i, 1);
            this.ChangeDetectorRef.detectChanges();
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

  initPages(count) {

    let page = 1;
    this.pages = [];

    while (count > this.limit) {
      count -= this.limit;
      this.pages.push(page);
      page++;
    }

    this.pages.push(page);

  }

  trackPages(index) {
    return index;
  }

  trackProjects(index, item) {
    return item._id;
  }

  onLoad() {
    this.ProjectProvider.getUserProjects((this.page - 1) * this.limit, this.limit).subscribe((res: any) => {
      this.projects = res.result.data;
      this.initPages(res.result.count);
      this.ChangeDetectorRef.markForCheck();
    });
  }

}
