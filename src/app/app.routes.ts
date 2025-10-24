import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Done } from './done/done';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home page',
  },
  {
    path: 'form',
    component: Home,
    title: 'Home page',
  },
  {
    path: 'form/done',
    component: Done,
    title: 'Done page',
  },
  { path: '**', component: NotFound },
];
