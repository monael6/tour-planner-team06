import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TourLogFormComponent } from './tour-log-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { convertToParamMap } from '@angular/router';

describe('TourLogFormComponent', () => {
  let component: TourLogFormComponent;
  let fixture: ComponentFixture<TourLogFormComponent>;
  let mockTourService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockTourService = jasmine.createSpyObj(['addLog']);
    
    mockActivatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({ id: '1' })
      },
      get root() { return this; },
      get pathFromRoot() { return [this]; }
    };

    await TestBed.configureTestingModule({
      imports: [TourLogFormComponent, FormsModule],
      providers: [
        { provide: TourService, useValue: mockTourService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
