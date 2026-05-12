import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tour-form',
  imports: [RouterLink, FormsModule],
  templateUrl: './tour-form.component.html',
  styleUrl: './tour-form.component.css'
})
export class TourFormComponent {
  tour = {
    name: '',
    description: '',
    from: '',
    to: '',
    transportType: 'Walking',
    distance: 0
  };

  saveTour() {
    console.log('New tour:', this.tour);
    alert('Tour saved successfully!');
  }
}