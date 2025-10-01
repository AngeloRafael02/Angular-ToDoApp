import { TestBed } from '@angular/core/testing';

import { PostgresService } from './postgres.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PostgresService', () => {
  let service: PostgresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PostgresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
