import { Component, Input } from '@angular/core';

export interface Tour {
  name: string;
  description: string;
  from: string;
  to: string;
  transportType: string;
  distance: number;
}

@Component({
  selector: 'app-tour-card',
  imports: [],
  templateUrl: './tour-card.component.html',
  styleUrl: './tour-card.component.css'
})
export class TourCardComponent {
  @Input() tour!: Tour;
}