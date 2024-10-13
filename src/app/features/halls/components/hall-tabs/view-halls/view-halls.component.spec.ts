import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHallsComponent } from './view-halls.component';

describe('ViewHallsComponent', () => {
  let component: ViewHallsComponent;
  let fixture: ComponentFixture<ViewHallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHallsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
