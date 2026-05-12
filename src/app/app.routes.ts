import { Routes } from '@angular/router';
import { TourListComponent } from './pages/tour-list/tour-list.component';
import { TourFormComponent } from './pages/tour-form/tour-form.component';
import { TourDetailComponent } from './pages/tour-detail/tour-detail.component';

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
  }
];