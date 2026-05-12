import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tour } from '../../services/tour.service';

@Component({
  selector: 'app-tour-card',
  imports: [RouterLink],
  templateUrl: './tour-card.component.html',
  styleUrl: './tour-card.component.css'
})
export class TourCardComponent {
  @Input() tour!: Tour;
}