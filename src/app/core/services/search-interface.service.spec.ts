import { TestBed } from '@angular/core/testing';

import { SearchInterfaceService } from './search-interface.service';

describe('SearchInterfaceService', () => {
  let service: SearchInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
