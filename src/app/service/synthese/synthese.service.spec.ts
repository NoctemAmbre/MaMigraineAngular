import { TestBed, inject } from '@angular/core/testing';

import { SyntheseService } from './synthese.service';

describe('SyntheseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SyntheseService]
    });
  });

  it('should be created', inject([SyntheseService], (service: SyntheseService) => {
    expect(service).toBeTruthy();
  }));
});
