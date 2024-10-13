import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTrainingSessionComponent } from './form-training-session.component';

describe('FormTrainingSessionComponent', () => {
  let component: FormTrainingSessionComponent;
  let fixture: ComponentFixture<FormTrainingSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTrainingSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormTrainingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
