import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Tour, TourService } from '../../services/tour.service';

@Component({
  selector: 'app-tour-form',
  imports: [RouterLink, FormsModule],
  templateUrl: './tour-form.component.html',
  styleUrl: './tour-form.component.css'
})
export class TourFormComponent {
  tour: Tour = {
    name: '',
    description: '',
    from: '',
    to: '',
    transportType: 'Walking',
    distance: 0
  };

  constructor(
    private tourService: TourService,
    private router: Router
  ) {}

  saveTour(): void {
    this.tourService.addTour(this.tour);
    alert('Tour saved successfully!');
    this.router.navigate(['/tours']);
  }
}