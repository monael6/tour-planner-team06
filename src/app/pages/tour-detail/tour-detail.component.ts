import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Tour, TourLog, TourService } from '../../services/tour.service';

@Component({
  selector: 'app-tour-detail',
  imports: [RouterLink],
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.css'
})
export class TourDetailComponent {
  tour?: Tour;
  logs: TourLog[] = [];

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tour = this.tourService.getTourById(id);
    this.logs = this.tourService.getLogsForTour(id);
  }
}