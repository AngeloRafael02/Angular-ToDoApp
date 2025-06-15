import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoFinishedComponent } from './to-do-finished.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ToDoFinishedComponent', () => {
  let component: ToDoFinishedComponent;
  let fixture: ComponentFixture<ToDoFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoFinishedComponent],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
