import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoCancelledComponent } from './to-do-cancelled.component';

describe('ToDoCancelledComponent', () => {
  let component: ToDoCancelledComponent;
  let fixture: ComponentFixture<ToDoCancelledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoCancelledComponent]
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
