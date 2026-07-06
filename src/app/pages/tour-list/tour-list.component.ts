import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { TourCardComponent } from '../../components/tour-card/tour-card.component';
import { Tour, TourService } from '../../services/tour.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [TourCardComponent, RouterLink, FormsModule, CommonModule],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.css'
})
export class TourListComponent {
  tours: Tour[] = [];
  searchText = '';
  username = '';

  constructor(
    private tourService: TourService,
    private authService: AuthService,
    private router: Router
  ) {
    this.username = this.authService.getUsername() || 'Gast';
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

  onSearch(): void {
    if (!this.searchText.trim()) {
      this.loadTours();
      return;
    }

    this.tourService.searchTours(this.searchText).subscribe({
      next: (data) => {
        this.tours = data;
      },
      error: (error) => {
        console.error('Error searching tours:', error);
      }
    });
  }

  deleteTour(id: number): void {
    if (confirm('Möchten Sie diese Tour wirklich löschen?')) {
      this.tourService.deleteTour(id).subscribe({
        next: () => {
          this.tours = this.tours.filter(tour => tour.id !== id);
        },
        error: (error) => {
          console.error('Error deleting tour:', error);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // ==========================================
  // Import / Export
  // ==========================================

  exportTours(): void {
    this.tourService.exportTours().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tours_export_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error exporting tours:', error);
      }
    });
  }

  exportSummaryPdf(): void {
    this.tourService.exportSummaryPdf().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tours_summary_${Date.now()}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error exporting PDF summary:', error);
        alert('PDF-Zusammenfassung konnte nicht erstellt werden.');
      }
    });
  }

  triggerImport(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const json = e.target.result;
      this.tourService.importTours(json).subscribe({
        next: () => {
          alert('Tours erfolgreich importiert!');
          this.loadTours();
        },
        error: (error) => {
          console.error('Error importing tours:', error);
          alert('Fehler beim Import: ' + (error.error?.message || 'Ungültiges Format'));
        }
      });
    };
    reader.readAsText(file);
  }
}