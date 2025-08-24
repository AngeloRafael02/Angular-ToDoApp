import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoFinishedComponent } from './to-do-finished.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ToDoFinishedComponent', () => {
  let component: ToDoFinishedComponent;
  let fixture: ComponentFixture<ToDoFinishedComponent>;
  let debugElement: DebugElement;

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
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the table with id "finished"', () => {
    const tableElement: DebugElement = debugElement.query(By.css('#finished'));
    expect(tableElement).toBeTruthy();

    const tableNativeElement: HTMLElement = tableElement.nativeElement;
    expect(tableNativeElement.tagName.toLowerCase()).toBe('table');
  });

  it('should have a mat-table element', () => {
    const tableElement = fixture.debugElement.query(By.css('table.mat-table'));
    expect(tableElement).toBeTruthy();
  });

});
