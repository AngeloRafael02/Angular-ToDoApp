import {  Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { ToDoFormComponent } from '../to-do-form/to-do-form.component';
import { PostgresService } from '../../services/postgres.service';
import { MiscService } from '../../services/misc.service';
import { taskViewInterface } from '../../interfaces';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-to-do-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  templateUrl:'to-do-list.component.html',
  styleUrls:['to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit{

  constructor(
    private matDialog:MatDialog,
    private loadingService:LoadingService,
    private psql:PostgresService,
    private misc:MiscService,
  ){}

  public taskFormDialogRef:MatDialogRef<ToDoFormComponent>
  public taskColumns:string[] = [];
  public dataSource:MatTableDataSource<taskViewInterface, MatPaginator>;


  ngOnInit(): void {
    try {
      this.loadingService.loadingOn();
      this.psql.getColumnHeaders('task_view').subscribe(data => {
        this.taskColumns = data;
        this.taskColumns = this.misc.insertArrayAtIndex(this.taskColumns,["Options"],10)
      });
      this.psql.getAllTaskByID(1).subscribe(data => {
        this.dataSource = new MatTableDataSource<taskViewInterface>(data);
      });
    } catch (error) {
      
    } finally {
      this.loadingService.loadingOff()
    }
  }

  public updateTask(task:number){
    this.taskFormDialogRef = this.matDialog.open(ToDoFormComponent, {
      data: { option:'update', ID:task },
      disableClose: false
    });
  }

  public deleteTask(ID:number){
    this.psql.deleteOneTask(ID);
  }

  public finishTask(ID:number){
    this.psql.finishOneTask(ID);
  }

  public deadlineFormatHelper(deadline:string):string{
    if (deadline == null){
      return  '';
    } else {
      return deadline || deadline.trim() !== '' ? deadline.toString().slice(0,10) : '';

    }
  }
  
  public getThreatLevelCellClass(threat:string): string {
    switch (threat){
      case 'Low':
        return 'greenCell';
      case 'Medium':
        return 'yellowCell';
      case 'High':
        return 'greenCell';
      case 'Alarming':
        return 'redCell';
      case 'Inevitable':
        return 'aquaCell';
      default:
        return 'whiteCell'
    }
  }

  public getStatusColorClass(status:string): string {
    switch (status){
      case 'Unfinished':
        return 'greyCell';
      case 'In Progress':
        return 'yellowCell';
      case 'Finished':
        return 'greenCell';
      case 'Cancelled':
        return 'redCell';
      case 'Delayed':
        return 'aquaCell';
      case 'Continuous':
        return 'lightblueCell';
      case 'On Hold':
        return 'coralCell';
      case 'Speculation':
        return 'bluevioletCell';
      default:
        return 'whiteCell'
    }
  }

  public evaluateDate(row:taskViewInterface):string {
    const dateString = row.Deadline
    if (dateString == null) {
      return 'whiteRow';
    }
    
    const inputDate:Date = new Date(dateString);
    inputDate.setHours(0, 0, 0, 0);
    const today:Date = new Date();
    today.setHours(0, 0, 0, 0);
    const timeDifference:number = today.getTime() - inputDate.getTime();
    const daysDifference:number = timeDifference / (1000 * 60 * 60 * 24);
  
    if (daysDifference === 0) {
      return 'redRow';
    } else if (daysDifference >= -5 && daysDifference < 0) {
      return 'orangeRow';
    } else if (daysDifference < -5) {
      return 'greenRow';
    } else if (daysDifference >= 1) {
      return 'blackRow';
    } else {
      return 'whiteRow';
    }
  }

}
