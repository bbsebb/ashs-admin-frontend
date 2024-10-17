import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallCardDialogComponent } from './hall-card-dialog.component';

describe('HallCardDialogComponent', () => {
  let component: HallCardDialogComponent;
  let fixture: ComponentFixture<HallCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HallCardDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
