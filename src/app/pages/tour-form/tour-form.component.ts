import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Tour, TourService } from '../../services/tour.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tour-form',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './tour-form.component.html',
  styleUrl: './tour-form.component.css'
})
export class TourFormComponent implements OnInit {
  isEditMode = false;
  tourId?: number;
  loading = false;

  tour: Tour = {
    name: '',
    description: '',
    fromLocation: '',
    toLocation: '',
    transportType: 'Cycling',
    distance: 0,
    estimatedTime: 0
  };

  transportTypes = ['Cycling', 'Hike', 'Running', 'Vacation'];

  constructor(
    private tourService: TourService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.tourId = +idParam;
      this.loadTour(this.tourId);
    }
  }

  loadTour(id: number): void {
    this.loading = true;
    this.tourService.getTourById(id).subscribe({
      next: (data) => {
        this.tour = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tour:', error);
        alert('Fehler beim Laden der Tour.');
        this.router.navigate(['/tours']);
      }
    });
  }

  saveTour(): void {
    this.loading = true;
    if (this.isEditMode && this.tourId) {
      this.tourService.updateTour(this.tourId, this.tour).subscribe({
        next: () => {
          this.loading = false;
          alert('Tour erfolgreich aktualisiert!');
          this.router.navigate(['/tours']);
        },
        error: (error) => {
          console.error('Error updating tour:', error);
          this.loading = false;
          alert('Fehler beim Aktualisieren der Tour: ' + (error.error?.message || error.message));
        }
      });
    } else {
      this.tourService.addTour(this.tour).subscribe({
        next: () => {
          this.loading = false;
          alert('Tour erfolgreich erstellt!');
          this.router.navigate(['/tours']);
        },
        error: (error) => {
          console.error('Error saving tour:', error);
          this.loading = false;
          alert('Fehler beim Speichern der Tour: ' + (error.error?.message || error.message));
        }
      });
    }
  }
}