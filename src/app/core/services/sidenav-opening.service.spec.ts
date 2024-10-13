import { TestBed } from '@angular/core/testing';

import { SidenavOpeningService } from './sidenav-opening.service';

describe('SidenavOpeningService', () => {
  let service: SidenavOpeningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidenavOpeningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with isOpen as false', () => {
    expect(service.isOpen()).toBe(false);
  });

  it('should toggle isOpen state', () => {
    service.toggle();
    expect(service.isOpen()).toBe(true);
    service.toggle();
    expect(service.isOpen()).toBe(false);
  });
});
