import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Tour {
  id: number;
  name: string;
  description: string;
  fromLocation: string;
  toLocation: string;
  transportType: string;
  distance: number;
}

export interface TourLog {
  id: number;
  tourId: number;
  date: string;
  comment: string;
  difficulty: string;
  totalDistance: number;
  totalTime: number;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private apiUrl = 'http://localhost:8080/api/tours';

  private tours: Tour[] = [];

  private tourLogs: TourLog[] = [
    {
      id: 0,
      tourId: 1,
      date: '2026-05-10',
      comment: 'Nice city walk with good weather.',
      difficulty: 'Easy',
      totalDistance: 4.5,
      totalTime: 60,
      rating: 5
    },
    {
      id: 1,
      tourId: 2,
      date: '2026-05-11',
      comment: 'Long but relaxing bike tour.',
      difficulty: 'Medium',
      totalDistance: 15,
      totalTime: 90,
      rating: 4
    }
  ];

  constructor(private http: HttpClient) {}

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.apiUrl).pipe(
      tap((data) => {
        this.tours = data;
      })
    );
  }

  getTourById(id: number): Tour | undefined {
    return this.tours.find(tour => tour.id === id);
  }

  addTour(tour: Tour): void {
    tour.id = this.tours.length + 1;
    this.tours.push(tour);
  }

  updateTour(updatedTour: Tour): void {
    const index = this.tours.findIndex(tour => tour.id === updatedTour.id);

    if (index !== -1) {
      this.tours[index] = updatedTour;
    }
  }

  deleteTour(id: number): void {
    this.tours = this.tours.filter(tour => tour.id !== id);
  }

  getLogsForTour(tourId: number): TourLog[] {
    return this.tourLogs.filter(log => log.tourId === tourId);
  }

  addLog(log: TourLog): void {
    log.id = this.tourLogs.length;
    this.tourLogs.push(log);
  }

  getPopularity(tourId: number): string {
    const logs = this.getLogsForTour(tourId);

    if (logs.length === 0) {
      return 'No logs yet';
    }

    if (logs.length <= 1) {
      return 'Low';
    }

    if (logs.length <= 3) {
      return 'Medium';
    }

    return 'High';
  }

  getChildFriendliness(tourId: number): string {
    const logs = this.getLogsForTour(tourId);

    if (logs.length === 0) {
      return 'Unknown';
    }

    const hasHardLog = logs.some(log => log.difficulty === 'Hard');
    const averageDistance =
      logs.reduce((sum, log) => sum + log.totalDistance, 0) / logs.length;
    const averageTime =
      logs.reduce((sum, log) => sum + log.totalTime, 0) / logs.length;

    if (hasHardLog || averageDistance > 10 || averageTime > 120) {
      return 'Low';
    }

    if (averageDistance > 5 || averageTime > 60) {
      return 'Medium';
    }

    return 'High';
  }
}