// noinspection JSDeprecatedSymbols

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SidenavComponent} from './sidenav.component';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {SidenavOpeningService} from "../services/sidenav-opening.service";



describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let mockService: jasmine.SpyObj<SidenavOpeningService> = jasmine.createSpyObj('SidenavOpeningService', ['isOpen', 'toggle']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavComponent,MatSidenavModule, NoopAnimationsModule],
      providers: [
        { provide: SidenavOpeningService, useValue: mockService },

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update "opened" to true based on SidenavOpeningService', () => {
    mockService.isOpen.and.returnValue(true);
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.opened).toBeTrue();
  });

  it('should update "opened" to false based on SidenavOpeningService', () => {
    mockService.isOpen.and.returnValue(false);
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.opened).toBeFalse();
  });
});
