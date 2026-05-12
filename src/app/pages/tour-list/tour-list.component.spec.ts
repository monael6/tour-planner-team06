import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TourCardComponent } from '../../components/tour-card/tour-card.component';
import { Tour, TourService } from '../../services/tour.service';

@Component({
  selector: 'app-tour-list',
  imports: [TourCardComponent, RouterLink, FormsModule],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.css'
})
export class TourListComponent {
deleteTour($event: number) {
throw new Error('Method not implemented.');
}
  tours: Tour[] = [];
  searchText = '';

  constructor(private tourService: TourService) {
    this.loadTours();
  }

  loadTours(): void {
    this.tourService.getTours().subscribe({
      next: (data) => {
        this.tours = data;
      },
      error: (error) => {
        console.error('Error loading tours:', error);
      }
    });
  }

  get filteredTours(): Tour[] {
    const search = this.searchText.toLowerCase().trim();

    if (!search) {
      return this.tours;
    }

    return this.tours.filter(tour =>
      tour.name.toLowerCase().includes(search) ||
      tour.description.toLowerCase().includes(search) ||
      tour.fromLocation.toLowerCase().includes(search) ||
      tour.toLocation.toLowerCase().includes(search) ||
      tour.transportType.toLowerCase().includes(search)
    );
  }
}