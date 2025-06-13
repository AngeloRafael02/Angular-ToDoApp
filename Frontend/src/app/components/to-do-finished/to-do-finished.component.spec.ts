import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoFinishedComponent } from './to-do-finished.component';

describe('ToDoFinishedComponent', () => {
  let component: ToDoFinishedComponent;
  let fixture: ComponentFixture<ToDoFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoFinishedComponent]
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
