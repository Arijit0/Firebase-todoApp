import { TestBed } from '@angular/core/testing';

import { ArrayDataService } from './array-data.service';

describe('ArrayDataService', () => {
  let service: ArrayDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
