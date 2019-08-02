import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort, Categories } from 'src/globals/config';
import { ProjectProvider } from 'src/app/providers';

@Component({
  selector: 'projects-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectsComponent {

  page = 1;
  limit = 12;
  pages = []
  projects = [];
  sort = Sort.popular.key;
  category = Categories.everything.key;
  sortMethods = Sort;
  categoryMethods = Categories;

  constructor(
    private Router: Router,
    private ChangeDetectorRef: ChangeDetectorRef,
    private ProjectProvider: ProjectProvider,
    private ActivatedRoute: ActivatedRoute
  ) {
    this.ActivatedRoute.queryParams.subscribe((params) => {
      this.page = params.page || this.page;
      this.sort = params.sort || this.sort;
      this.category = params.category || this.category;
      this.onLoad();
    });
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

  changeSort(sort) {
    this.Router.navigate(['/projects'], {
      queryParams: {
        sort,
        page: 1
      },
      queryParamsHandling: 'merge'
    });
  }

  changeCategory(category) {
    this.Router.navigate(['/projects'], {
      queryParams: {
        category,
        page: 1
      },
      queryParamsHandling: 'merge'
    });
  }

  trackPages(index) {
    return index;
  }

  trackProjects(index, item){
    return item._id;
  }

  onLoad() {
    this.ProjectProvider.getMany(this.sort, this.category, (this.page - 1) * this.limit, this.limit).subscribe((res: any) => {
      this.projects = res.result.data;
      this.initPages(res.result.count);
      this.ChangeDetectorRef.markForCheck();
    });
  }

}
