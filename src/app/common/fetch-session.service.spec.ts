import { TestBed } from '@angular/core/testing';

import { FetchSessionService } from './fetch-session.service';

describe('FetchSessionService', () => {
  let service: FetchSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
