import { TestBed } from '@angular/core/testing';

import { SpecificFakeDataService } from './specific-fake-data.service';

describe('SpecificFakeDataService', () => {
  let service: SpecificFakeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificFakeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
