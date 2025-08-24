import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoCancelledComponent } from './to-do-cancelled.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ToDoCancelledComponent', () => {
  let component: ToDoCancelledComponent;
  let fixture: ComponentFixture<ToDoCancelledComponent>;
  let debugElement: DebugElement;

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
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the table with id "cancelled"', () => {
    const tableElement: DebugElement = debugElement.query(By.css('#cancelled'));
    expect(tableElement).toBeTruthy();

    const tableNativeElement: HTMLElement = tableElement.nativeElement;
    expect(tableNativeElement.tagName.toLowerCase()).toBe('table');
  });

  it('should have a mat-table element', () => {
    const tableElement = fixture.debugElement.query(By.css('table.mat-table'));
    expect(tableElement).toBeTruthy();
  });
});
