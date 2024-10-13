import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrainingSessionsComponent } from './view-training-sessions.component';

describe('ViewTrainingSessionsComponent', () => {
  let component: ViewTrainingSessionsComponent;
  let fixture: ComponentFixture<ViewTrainingSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTrainingSessionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTrainingSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
