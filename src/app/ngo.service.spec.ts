import { TestBed, inject } from '@angular/core/testing';

import { NgoService } from './ngo.service';

describe('NgoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgoService]
    });
  });

  it('should be created', inject([NgoService], (service: NgoService) => {
    expect(service).toBeTruthy();
  }));
});
