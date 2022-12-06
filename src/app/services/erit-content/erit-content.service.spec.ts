import { TestBed } from '@angular/core/testing';

import { EritContentService } from './erit-content.service';

describe('EritContentService', () => {
  let service: EritContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EritContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
