import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSessionTabsComponent } from './training-session-tabs.component';

describe('TrainingSessionTabsComponent', () => {
  let component: TrainingSessionTabsComponent;
  let fixture: ComponentFixture<TrainingSessionTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingSessionTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingSessionTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
