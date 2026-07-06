import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TourCardComponent } from './tour-card.component';
import { provideRouter } from '@angular/router';

describe('TourCardComponent', () => {
  let component: TourCardComponent;
  let fixture: ComponentFixture<TourCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourCardComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourCardComponent);
    component = fixture.componentInstance;
    
    // Provide a dummy tour since it's an @Input property
    component.tour = {
      id: 1,
      name: 'Test Tour',
      description: 'Test Desc',
      fromLocation: 'Vienna',
      toLocation: 'Graz',
      transportType: 'Cycling',
      distance: 200,
      estimatedTime: 120,
      childFriendliness: 'High',
      popularity: 'Low'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
