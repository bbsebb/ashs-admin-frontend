import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallTabsComponent } from './hall-tabs.component';

describe('HallTabsComponent', () => {
  let component: HallTabsComponent;
  let fixture: ComponentFixture<HallTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HallTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HallTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
