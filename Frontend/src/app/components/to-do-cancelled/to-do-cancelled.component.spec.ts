import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoCancelledComponent } from './to-do-cancelled.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ToDoCancelledComponent', () => {
  let component: ToDoCancelledComponent;
  let fixture: ComponentFixture<ToDoCancelledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoCancelledComponent],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoCancelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
