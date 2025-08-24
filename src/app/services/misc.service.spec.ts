import { TestBed } from '@angular/core/testing';

import { MiscService } from './misc.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('MiscService', () => {
  let service: MiscService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(MiscService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
