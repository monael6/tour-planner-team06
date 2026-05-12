import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TourLog, TourService } from '../../services/tour.service';

@Component({
  selector: 'app-tour-log-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './tour-log-form.component.html',
  styleUrl: './tour-log-form.component.css'
})
export class TourLogFormComponent {
  tourId = 0;

  log: TourLog = {
    id: 0,
    tourId: 0,
    date: '',
    comment: '',
    difficulty: 'Easy',
    totalDistance: 0,
    totalTime: 0,
    rating: 5
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tourService: TourService
  ) {
    this.tourId = Number(this.route.snapshot.paramMap.get('id'));
    this.log.tourId = this.tourId;
  }

  saveLog(): void {
    this.tourService.addLog(this.log);
    alert('Tour log saved successfully!');
    this.router.navigate(['/tours', this.tourId]);
  }
}