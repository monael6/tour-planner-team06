import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Tour, TourService } from '../../services/tour.service';

@Component({
  selector: 'app-tour-form',
  imports: [RouterLink, FormsModule],
  templateUrl: './tour-form.component.html',
  styleUrl: './tour-form.component.css'
})
export class TourFormComponent {
  isEditMode = false;

  tour: Tour = {
    id: 0,
    name: '',
    description: '',
    fromLocation: '',
    toLocation: '',
    transportType: 'Walking',
    distance: 0
  };

  constructor(
    private tourService: TourService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  saveTour(): void {
    this.tourService.addTour(this.tour).subscribe({
      next: () => {
        alert('Tour saved successfully!');
        this.router.navigate(['/tours']);
      },
      error: (error) => {
        console.error('Error saving tour:', error);
        alert('Error saving tour!');
      }
    });
  }
}