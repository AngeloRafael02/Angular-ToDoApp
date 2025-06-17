import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListComponent } from './to-do-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ToDoListComponent', () => {
  let component: ToDoListComponent;
  let fixture: ComponentFixture<ToDoListComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoListComponent],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the table with id "tasks"', () => {
    const tableElement: DebugElement = debugElement.query(By.css('#tasks'));
    expect(tableElement).toBeTruthy();

    const tableNativeElement: HTMLElement = tableElement.nativeElement;
    expect(tableNativeElement.tagName.toLowerCase()).toBe('table');
  });

  it('should ensure the table is visible (optional, but good practice)', () => {
    const tableElement: DebugElement = debugElement.query(By.css('#tasks'));
    expect(tableElement).toBeTruthy(); // First, ensure it exists

    const tableNativeElement: HTMLElement = tableElement.nativeElement;
    expect(tableNativeElement.offsetWidth).toBeGreaterThan(0);
    expect(tableNativeElement.offsetHeight).toBeGreaterThan(0);
  });
});
