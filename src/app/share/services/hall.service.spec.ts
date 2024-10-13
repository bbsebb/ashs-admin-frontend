import { TestBed } from '@angular/core/testing';

import { HallService } from './hall.service';

describe('HallServiceService', () => {
  let service: HallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
