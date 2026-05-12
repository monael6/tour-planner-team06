import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tour, TourCardComponent } from '../../components/tour-card/tour-card.component';

@Component({
  selector: 'app-tour-list',
  imports: [TourCardComponent, RouterLink],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.css'
})
export class TourListComponent {
  tours: Tour[] = [
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
}