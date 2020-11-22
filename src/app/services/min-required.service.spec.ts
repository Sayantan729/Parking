import { TestBed } from '@angular/core/testing';

import { MinRequiredService } from './min-required.service';

describe('MinRequiredService', () => {
  let service: MinRequiredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinRequiredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
