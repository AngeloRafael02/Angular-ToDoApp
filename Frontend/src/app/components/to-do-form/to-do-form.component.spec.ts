import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoFormComponent } from './to-do-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ToDoFormComponent', () => {
  let component: ToDoFormComponent;
  let fixture: ComponentFixture<ToDoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoFormComponent],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
