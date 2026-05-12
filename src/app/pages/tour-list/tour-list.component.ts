import { Component } from '@angular/core';

interface Tour {
  name: string;
  description: string;
  from: string;
  to: string;
  transportType: string;
  distance: number;
}

@Component({
  selector: 'app-tour-list',
  imports: [],
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