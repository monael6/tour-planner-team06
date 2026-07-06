import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TourListComponent } from './tour-list.component';
import { TourService } from '../../services/tour.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';

describe('TourListComponent', () => {
  let component: TourListComponent;
  let fixture: ComponentFixture<TourListComponent>;
  let mockTourService: any;
  let mockAuthService: any;
  let router: Router;

  beforeEach(async () => {
    mockTourService = jasmine.createSpyObj(['getTours', 'searchTours', 'deleteTour']);
    mockTourService.getTours.and.returnValue(of([]));
    mockAuthService = jasmine.createSpyObj(['getUsername', 'logout']);
    mockAuthService.getUsername.and.returnValue('TestUser');

    await TestBed.configureTestingModule({
      imports: [TourListComponent, FormsModule],
      providers: [
        { provide: TourService, useValue: mockTourService },
        { provide: AuthService, useValue: mockAuthService },
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});