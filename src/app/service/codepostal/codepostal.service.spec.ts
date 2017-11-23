import { TestBed, inject } from '@angular/core/testing';

import { CodepostalService } from './codepostal.service';

describe('CodepostalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodepostalService]
    });
  });

  it('should be created', inject([CodepostalService], (service: CodepostalService) => {
    expect(service).toBeTruthy();
  }));
});
