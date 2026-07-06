import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tour {
  id?: number;
  name: string;
  description: string;
  fromLocation: string;
  toLocation: string;
  transportType: string;
  distance: number;
  estimatedTime: number;
  routeInformation?: string;
  imageUrl?: string;
  popularity?: string;
  childFriendliness?: string;
}

export interface TourLog {
  id?: number;
  tourId: number;
  dateTime: string; // ISO String (LocalDateTime in Java)
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

  constructor(private http: HttpClient) {}

  // ==========================================
  // Tour CRUD Operations (Scoped to logged-in user)
  // ==========================================

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.apiUrl);
  }

  getTourById(id: number): Observable<Tour> {
    return this.http.get<Tour>(`${this.apiUrl}/${id}`);
  }

  addTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(this.apiUrl, tour);
  }

  updateTour(id: number, tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(`${this.apiUrl}/${id}`, tour);
  }

  deleteTour(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchTours(query: string): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.apiUrl}/search?query=${encodeURIComponent(query)}`);
  }

  // ==========================================
  // Tour Logs (Nested REST resource under Tours)
  // ==========================================

  getLogsForTour(tourId: number): Observable<TourLog[]> {
    return this.http.get<TourLog[]>(`${this.apiUrl}/${tourId}/logs`);
  }

  addLog(tourId: number, log: TourLog): Observable<TourLog> {
    return this.http.post<TourLog>(`${this.apiUrl}/${tourId}/logs`, log);
  }

  updateLog(tourId: number, logId: number, log: TourLog): Observable<TourLog> {
    return this.http.put<TourLog>(`${this.apiUrl}/${tourId}/logs/${logId}`, log);
  }

  deleteLog(tourId: number, logId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${tourId}/logs/${logId}`);
  }

  // ==========================================
  // Image Upload
  // ==========================================

  uploadImage(tourId: number, file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ imageUrl: string }>(`${this.apiUrl}/${tourId}/image`, formData);
  }

  // ==========================================
  // JSON Import / Export
  // ==========================================

  exportTours(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export`, { responseType: 'blob' });
  }

  importTours(jsonString: string): Observable<Tour[]> {
    return this.http.post<Tour[]>(`${this.apiUrl}/import`, jsonString, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // ==========================================
  // PDF Report Generation
  // ==========================================

  exportTourPdf(tourId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${tourId}/pdf`, { responseType: 'blob' });
  }

  exportSummaryPdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/pdf-summary`, { responseType: 'blob' });
  }
}