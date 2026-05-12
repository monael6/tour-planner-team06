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
    from: '',
    to: '',
    transportType: 'Walking',
    distance: 0
  };

  constructor(
    private tourService: TourService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam !== null) {
      const id = Number(idParam);
      const existingTour = this.tourService.getTourById(id);

      if (existingTour) {
        this.isEditMode = true;
        this.tour = { ...existingTour };
      }
    }
  }

  saveTour(): void {
    if (this.isEditMode) {
      this.tourService.updateTour(this.tour);
      alert('Tour updated successfully!');
    } else {
      this.tourService.addTour(this.tour);
      alert('Tour saved successfully!');
    }

    this.router.navigate(['/tours']);
  }
}