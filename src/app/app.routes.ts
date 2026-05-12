import { Routes } from '@angular/router';
import { TourListComponent } from './pages/tour-list/tour-list.component';
import { TourFormComponent } from './pages/tour-form/tour-form.component';
import { TourDetailComponent } from './pages/tour-detail/tour-detail.component';
import { TourLogFormComponent } from './pages/tour-log-form/tour-log-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tours',
    pathMatch: 'full'
  },
  {
    path: 'tours',
    component: TourListComponent
  },
  {
    path: 'tours/new',
    component: TourFormComponent
  },
  {
    path: 'tours/:id',
    component: TourDetailComponent
  },
  {
    path: 'tours/:id/edit',
    component: TourFormComponent
  },
  {
    path: 'tours/:id/logs/new',
    component: TourLogFormComponent
  }
];