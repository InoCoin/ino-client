import { Route } from '@angular/router';
import { Main } from './Main';
import { Projects } from './Projects';
import { FAQ } from './FAQ';
import { Project } from './Project';

export const MODULE_ROUTES: Route[] = [
  {
    path: '',
    component: Main
  },
  {
    path: 'projects',
    component: Projects
  },
  {
    path: 'project/:id',
    component: Project
  },
  {
    path: 'faq',
    component: FAQ
  }
];

export const MODULE_COMPONENTS = [
  Main,
  Projects,
  Project,
  FAQ
];
