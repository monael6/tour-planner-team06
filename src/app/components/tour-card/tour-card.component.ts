import { Component, Input } from '@angular/core';
import { Tour } from '../../services/tour.service';

@Component({
  selector: 'app-tour-card',
  imports: [],
  templateUrl: './tour-card.component.html',
  styleUrl: './tour-card.component.css'
})
export class TourCardComponent {
  @Input() tour!: Tour;
}