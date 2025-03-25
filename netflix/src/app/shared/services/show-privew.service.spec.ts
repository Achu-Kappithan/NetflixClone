import { TestBed } from '@angular/core/testing';

import { ShowPrivewService } from './show-privew.service';

describe('ShowPrivewService', () => {
  let service: ShowPrivewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowPrivewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
