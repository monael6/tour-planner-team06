import { Injectable } from '@angular/core';

export interface Tour {
  id: number;
  name: string;
  description: string;
  from: string;
  to: string;
  transportType: string;
  distance: number;
}

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private tours: Tour[] = [
    {
      id: 0,
      name: 'Vienna City Walk',
      description: 'A short walking tour through the city center.',
      from: 'Stephansplatz',
      to: 'Prater',
      transportType: 'Walking',
      distance: 4.5
    },
    {
      id: 1,
      name: 'Danube Bike Tour',
      description: 'A relaxing bike tour near the Danube river.',
      from: 'Donauinsel',
      to: 'Klosterneuburg',
      transportType: 'Bike',
      distance: 15
    }
  ];

  getTours(): Tour[] {
    return this.tours;
  }

  getTourById(id: number): Tour | undefined {
    return this.tours.find(tour => tour.id === id);
  }

  addTour(tour: Tour): void {
    tour.id = this.tours.length;
    this.tours.push(tour);
  }
  
  deleteTour(id: number): void {
    this.tours = this.tours.filter(tour => tour.id !== id);
  }
}