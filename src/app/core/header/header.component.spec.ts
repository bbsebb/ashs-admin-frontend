import {ComponentFixture, TestBed} from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {SidenavOpeningService} from "../../services/sidenav-opening.service";
import {By} from "@angular/platform-browser";
import {ScrollDispatcher, ViewportRuler} from "@angular/cdk/overlay";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {from, of} from "rxjs";
import {MatIconTestingModule} from "@angular/material/icon/testing";
import {ActivatedRoute} from "@angular/router";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let scrollDispatcher: ScrollDispatcher;
  let viewportRuler: ViewportRuler;
  let sidenavOpeningService: SidenavOpeningService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule,HeaderComponent,MatIconTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: {params: of([{id: 1}]),},},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Mock services
    scrollDispatcher = TestBed.inject(ScrollDispatcher);
    viewportRuler = TestBed.inject(ViewportRuler);
    sidenavOpeningService = TestBed.inject(SidenavOpeningService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isOpen on click', () => {
    spyOn(sidenavOpeningService, 'toggle');
    fixture.debugElement.query(By.css('#navbar-toggle-button')).triggerEventHandler('click', null);
    expect(sidenavOpeningService.toggle).toHaveBeenCalled();
  });



  it('getScrollTop should emit current scroll position', async() => {
    spyOn(viewportRuler, 'getViewportScrollPosition').and.returnValue({ top: 100, left: 0 });
    component.getScrollTop(scrollDispatcher,viewportRuler).subscribe((position) => {
      expect(position).toEqual(100);
    });
  });

  it('scrollLimit should emit true if scroll position is below the limit', async() => {
    spyOn(component, 'getScrollTop').and.returnValues(of(0),of(100)); // Simuler une position de défilement
    component.scrollLimit(scrollDispatcher, viewportRuler, 150).subscribe((isBelowLimit) => {
      expect(isBelowLimit).toBeTrue();
    });
  });

  it('scrollLimit should emit false if scroll position is above the limit ', async() => {
    spyOn(component, 'getScrollTop').and.returnValues(of(151),of(200)); // Simuler une position de défilement
    component.scrollLimit(scrollDispatcher, viewportRuler, 150).subscribe((isAboveLimit) => {
      expect(isAboveLimit).toBeFalse();
    });
  });


  it('directionScroll should emit true when scrolling up', async() => {
    spyOn(component, 'getScrollTop').and.returnValue(from([200, 150])); // Simuler un défilement vers le haut
    component.scrollDirection(scrollDispatcher, viewportRuler).subscribe((isScrollingUp) => {
      expect(isScrollingUp).toBeTrue();
    });
  });

  it("directionScroll should emit false when scrolling down", async () => {
    spyOn(component, 'getScrollTop').and.returnValue(from([150, 200])); // Simuler un défilement vers le bas
    component.scrollDirection(scrollDispatcher, viewportRuler).subscribe( (isScrollingDown) => {
        expect(isScrollingDown).toBeFalse();
      });
  });

  it('should show toolbar initially', () => {
    // Assuming the toolbar is visible by default
    const toolbarVisibility = component.showToolbar();
    expect(toolbarVisibility).toBeTrue();
  });

  it('should initialize showToolbar based on scroll events', async() => {

    const topLimitShowToolbar = component['topLimitShowToolbar'];
    // Simuler la position de défilement et le comportement attendu
    spyOn(component, 'getScrollTop').and.returnValues(of(150),of(150), of(200));
    expect(component.showToolbar()).toBeTrue();

  });

});

