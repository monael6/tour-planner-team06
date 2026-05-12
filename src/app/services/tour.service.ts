import { Injectable } from '@angular/core';

export interface Tour {
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
      name: 'Vienna City Walk',
      description: 'A short walking tour through the city center.',
      from: 'Stephansplatz',
      to: 'Prater',
      transportType: 'Walking',
      distance: 4.5
    },
    {
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

  addTour(tour: Tour): void {
    this.tours.push(tour);
  }
}