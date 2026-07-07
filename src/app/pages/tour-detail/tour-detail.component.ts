import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Tour, TourLog, TourService } from '../../services/tour.service';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-tour-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.css'
})
export class TourDetailComponent implements OnInit, AfterViewChecked {
  tour?: Tour;
  logs: TourLog[] = [];
  mapInitialized = false;
  private map?: L.Map;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTour(id);
  }

  ngAfterViewChecked(): void {
    if (this.tour && this.tour.routeInformation && !this.mapInitialized) {
      const element = document.getElementById('map');
      if (element) {
        this.initMap();
      }
    }
  }

  loadTour(id: number): void {
    this.tourService.getTourById(id).subscribe({
      next: (data) => {
        this.tour = data;
        this.loadLogs(id);
      },
      error: (error) => {
        console.error('Error loading tour detail:', error);
        alert('Tour konnte nicht geladen werden.');
        this.router.navigate(['/tours']);
      }
    });
  }

  loadLogs(tourId: number): void {
    this.tourService.getLogsForTour(tourId).subscribe({
      next: (data) => {
        this.logs = data;
      },
      error: (error) => {
        console.error('Error loading logs:', error);
      }
    });
  }

  deleteLog(logId: number): void {
    if (this.tour && this.tour.id && confirm('Möchten Sie diesen Log-Eintrag wirklich löschen?')) {
      this.tourService.deleteLog(this.tour.id, logId).subscribe({
        next: () => {
          this.logs = this.logs.filter(l => l.id !== logId);
          // Reload tour to update popularity / child-friendliness calculations
          if (this.tour && this.tour.id) {
            this.loadTour(this.tour.id);
          }
        },
        error: (error) => {
          console.error('Error deleting log:', error);
        }
      });
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file && this.tour && this.tour.id) {
      this.tourService.uploadImage(this.tour.id, file).subscribe({
        next: (response) => {
          if (this.tour) {
            this.tour.imageUrl = response.imageUrl;
          }
          alert('Bild erfolgreich hochgeladen!');
        },
        error: (error) => {
          console.error('Error uploading image:', error);
          alert('Fehler beim Upload des Bildes.');
        }
      });
    }
  }

  exportPdf(): void {
    if (this.tour && this.tour.id) {
      this.tourService.exportTourPdf(this.tour.id).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `tour_${this.tour?.id}_report_${Date.now()}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error('Error generating PDF:', error);
          alert('PDF-Bericht konnte nicht erstellt werden.');
        }
      });
    }
  }

  initMap(): void {
    if (this.mapInitialized || !this.tour || !this.tour.routeInformation) return;
    this.mapInitialized = true;

    try {
      // 1. Die vom Backend gelieferten GeoJSON-Geodaten parsen
      const geoData = JSON.parse(this.tour.routeInformation);

      // 2. Leaflet-Karten-Instanz erzeugen (Standard-Ausschnitt auf Wien zentriert)
      this.map = L.map('map', {
        zoomControl: true,
        fadeAnimation: true
      }).setView([48.2082, 16.3738], 13); // Wien Koordinaten

      // 3. Karten-Kacheln von OpenStreetMap hinzufügen
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // 4. Den Routenverlauf (GeoJSON-Geometrie) als blau-cyanfarbene Linie auf die Karte zeichnen
      const routeLayer = L.geoJSON(geoData, {
        style: {
          color: '#00f2fe',
          weight: 6,
          opacity: 0.85
        }
      }).addTo(this.map);

      // 5. Kartenausschnitt automatisch an die Ausdehnung (Bounds) der Route anpassen
      this.map.fitBounds(routeLayer.getBounds(), { padding: [30, 30] });

      // 6. Start- und Ziel-Marker setzen
      const coordinates = geoData.features[0].geometry.coordinates;
      if (coordinates && coordinates.length > 0) {
        const startPoint = coordinates[0];
        const endPoint = coordinates[coordinates.length - 1];

        // GeoJSON nutzt [lng, lat], aber Leaflet benötigt [lat, lng] (Reihenfolge getauscht!)
        L.marker([startPoint[1], startPoint[0]]).addTo(this.map).bindPopup('Startpunkt: ' + this.tour.fromLocation);
        L.marker([endPoint[1], endPoint[0]]).addTo(this.map).bindPopup('Zielpunkt: ' + this.tour.toLocation);
      }
    } catch (e) {
      console.error('Failed to init Leaflet Map:', e);
    }
  }
}