import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TourCardComponent } from '../../components/tour-card/tour-card.component';
import { Tour, TourService } from '../../services/tour.service';

@Component({
  selector: 'app-tour-list',
  imports: [TourCardComponent, RouterLink],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.css'
})
export class TourListComponent {
  tours: Tour[] = [];

  constructor(private tourService: TourService) {
    this.tours = this.tourService.getTours();
  }
}