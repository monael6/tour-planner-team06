import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() deleteClicked = new EventEmitter<number>();

  onDelete(): void {
    this.deleteClicked.emit(this.tour.id);
  }
}