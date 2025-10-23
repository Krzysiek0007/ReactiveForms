import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Done} from './done/done';

export const routes: Routes = [
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
];
