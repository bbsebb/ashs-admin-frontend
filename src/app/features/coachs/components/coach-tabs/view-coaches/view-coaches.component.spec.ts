import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoachesComponent } from './view-coaches.component';

describe('ViewCoachsComponent', () => {
  let component: ViewCoachesComponent;
  let fixture: ComponentFixture<ViewCoachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCoachesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCoachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
