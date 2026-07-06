import { Routes } from '@angular/router';
import { TourListComponent } from './pages/tour-list/tour-list.component';
import { TourFormComponent } from './pages/tour-form/tour-form.component';
import { TourDetailComponent } from './pages/tour-detail/tour-detail.component';
import { TourLogFormComponent } from './pages/tour-log-form/tour-log-form.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'tours',
    pathMatch: 'full'
  },
  {
    path: 'tours',
    component: TourListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'tours/new',
    component: TourFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'tours/:id',
    component: TourDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'tours/:id/edit',
    component: TourFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'tours/:id/logs/new',
    component: TourLogFormComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'tours'
  }
];