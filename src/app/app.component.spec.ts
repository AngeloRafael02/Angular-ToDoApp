import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute,
          useValue: { data: of({ result: 'test'}) }
        },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'About' section on default`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.currentRoute).toEqual('');
  });

  it('should Categories selection values load sucessfully', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.taskCategories.length).toBeGreaterThanOrEqual(0)
  });
  
  it('should Conditions selection values load sucessfully', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.taskConditions.length).toBeGreaterThanOrEqual(0)
  });
  
  it('should Threat level selection values load sucessfully', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.taskThreatLevels.length).toBeGreaterThanOrEqual(0)
  });
});
