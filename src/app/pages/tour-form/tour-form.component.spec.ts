import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TourFormComponent } from './tour-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { convertToParamMap } from '@angular/router';

describe('TourFormComponent', () => {
  let component: TourFormComponent;
  let fixture: ComponentFixture<TourFormComponent>;
  let mockTourService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockTourService = jasmine.createSpyObj(['getTourById', 'addTour', 'updateTour']);
    
    mockActivatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({})
      },
      get root() { return this; },
      get pathFromRoot() { return [this]; }
    };

    await TestBed.configureTestingModule({
      imports: [TourFormComponent, FormsModule],
      providers: [
        { provide: TourService, useValue: mockTourService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});