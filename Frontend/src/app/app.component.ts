import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog,MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';

import { ClockComponent } from './components/clock/clock.component';
import { ToDoFormComponent } from './components/to-do-form/to-do-form.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { categoriesInterface, conditionInterface, dialogDataInterface, threatInterface } from './interfaces';
import { PostgresService } from './services/postgres.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    MatButtonModule, 
    MatButtonToggleModule,
    MatTabsModule,
    ToDoListComponent,
    ClockComponent,
    MatGridListModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  private idleCallbackId: number | undefined;
  public matDialogRef: MatDialogRef<ToDoFormComponent>;
  public taskCategories:categoriesInterface[] = [];
  public taskConditions:conditionInterface[] = [];
  public taskThreatLevels:threatInterface[] = [];
  public title = 'Frontend';

  constructor(
    private matDialog: MatDialog,
    private psql:PostgresService
  ) {}

  ngOnInit(): void {
    if ('requestIdleCallback' in window) {
      this.idleCallbackId = window.requestIdleCallback((deadline) => {
        console.log('used requestIdleCallback()')
        this.processAllIdleTasks(); 
      }, { timeout: 1000 })
    } else {
      console.warn('requestIdleCallback is not supported. Using setTimeout as fallback.');
      setTimeout(() => {
        this.processAllIdleTasks(); // A hypothetical method to do all work at once
      }, 0);
    }

  }

  private processAllIdleTasks(){
    this.psql.getAllCategories().subscribe(data => this.taskCategories = data);
    this.psql.getAllConditions().subscribe(data => this.taskConditions = data);
    this.psql.getAllThreats().subscribe(data => this.taskThreatLevels = data);
  }

  OpenModal() {
    this.matDialogRef = this.matDialog.open(ToDoFormComponent, {
      data: <dialogDataInterface>{ 
        allCat:this.taskCategories,
        allCond:this.taskConditions,
        allThr:this.taskThreatLevels,
        option:'new', 
        ID:0 
      },
      disableClose: false
    });

    this.matDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
      }
    });
  }

  CloseModal(){
    this.matDialogRef.close(false)
  }
}
