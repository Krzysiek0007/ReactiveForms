import { Routes } from '@angular/router';
import { Home } from './home/home';

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
    loadComponent: () => import('./done/done').then(m => m.Done),
    title: 'Done page',
  },
  { 
    path: '**', 
    loadComponent: () => import('./not-found/not-found').then(m => m.NotFound),
    title: 'Not Found', 
  },
];
