import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TourListComponent } from './pages/tour-list/tour-list.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, TourListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}