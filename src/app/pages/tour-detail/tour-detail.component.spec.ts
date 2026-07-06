import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TourDetailComponent } from './tour-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { convertToParamMap } from '@angular/router';

describe('TourDetailComponent', () => {
  let component: TourDetailComponent;
  let fixture: ComponentFixture<TourDetailComponent>;
  let mockTourService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockTourService = jasmine.createSpyObj(['getTourById', 'getLogsForTour', 'deleteLog', 'uploadImage']);
    mockTourService.getTourById.and.returnValue(of({
      id: 1,
      name: 'Test Tour',
      description: 'Desc',
      fromLocation: 'A',
      toLocation: 'B',
      transportType: 'Cycling',
      distance: 10,
      estimatedTime: 60,
      routeInformation: '{"type":"FeatureCollection","features":[]}'
    }));
    mockTourService.getLogsForTour.and.returnValue(of([]));

    // Properly mock ActivatedRoute to satisfy RouterLink
    mockActivatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({ id: '1' })
      },
      get root() { return this; },
      get pathFromRoot() { return [this]; }
    };

    await TestBed.configureTestingModule({
      imports: [TourDetailComponent],
      providers: [
        { provide: TourService, useValue: mockTourService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
