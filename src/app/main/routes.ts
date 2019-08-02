import { Route } from '@angular/router';
import { NewsResolver } from '../resolvers/NewsResolver';

export const MODULE_ROUTES: Route[] = [
  {
    path: '',
    resolve: {
      news: NewsResolver
    },
    loadChildren: () => import('./home/index').then(m => m.HomeModule),
  },
  {
    path: 'project',
    loadChildren: () => import('./project/index').then(m => m.ProjectModule),
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/index').then(m => m.ProjectsModule),
  },
  {
    path: 'edit-project',
    loadChildren: () => import('./create-project/index').then(m => m.CreateProjectModule),
  },
  {
    path: 'create-project',
    loadChildren: () => import('./create-project/index').then(m => m.CreateProjectModule),
  }
];