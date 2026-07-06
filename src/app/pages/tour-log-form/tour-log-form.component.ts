import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TourLog, TourService } from '../../services/tour.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tour-log-form',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './tour-log-form.component.html',
  styleUrl: './tour-log-form.component.css'
})
export class TourLogFormComponent implements OnInit {
  tourId = 0;
  loading = false;

  log: TourLog = {
    tourId: 0,
    dateTime: '',
    comment: '',
    difficulty: 'Easy',
    totalDistance: 0,
    totalTime: 0,
    rating: 5
  };

  difficulties = ['Easy', 'Medium', 'Hard'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    this.tourId = Number(this.route.snapshot.paramMap.get('id'));
    this.log.tourId = this.tourId;

    // Set default dateTime to local time in format yyyy-MM-ddThh:mm
    const now = new Date();
    const tzOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(Date.now() - tzOffset)).toISOString().slice(0, 16);
    this.log.dateTime = localISOTime;
  }

  saveLog(): void {
    this.loading = true;
    this.tourService.addLog(this.tourId, this.log).subscribe({
      next: () => {
        this.loading = false;
        alert('Log-Eintrag erfolgreich gespeichert!');
        this.router.navigate(['/tours', this.tourId]);
      },
      error: (error) => {
        console.error('Error saving log:', error);
        this.loading = false;
        alert('Fehler beim Speichern des Logs: ' + (error.error?.message || error.message));
      }
    });
  }
}