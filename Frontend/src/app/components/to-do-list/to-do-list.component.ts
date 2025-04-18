import { Component, OnInit } from '@angular/core';
import { PostgresService } from '../../services/postgres.service';
import { MiscService } from '../../services/misc.service';
import { taskViewInterface } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToDoFormComponent } from '../to-do-form/to-do-form.component';

@Component({
  selector: 'app-to-do-list',
  imports: [
    CommonModule
  ],
  template:`  
    <table id="tasks">
      <thead>
        <tr>
          <th *ngFor="let col of taskColumns">{{col}}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of sampleData">
          <td>{{item.ID}}</td>
          <td>{{item.Title}}</td>
          <td>{{item.Description}}</td>
          <td>{{item.Category}}</td>
          <td>{{item.Priority}}</td>
          <td>{{item["Threat Level"]}}</td>
          <td>{{item.Status}}</td>
          <td>{{item.Deadline}}</td>
          <td>{{item["Created At"]}}</td>
          <td>{{item["Last Edited"]}}</td>
          <td>
            <button (click)="finishTask(item.ID)">Finish</button>
            <button (click)="updateTask(item.ID)">Update</button>
            <button (click)="deleteTask(item.ID)">Delete</button>
          </td>
          <td>{{item.SID}}</td>
          <td>{{item.TID}}</td>
          <td>{{item.UID}}</td>
          <td>{{item.CID}}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles:`
    table {width: 100%;}
    td{text-align: center;}
    table#tasks td:first-child,
    table#tasks th:first-child,
    table#tasks th:nth-child(9),
    table#tasks td:nth-child(9),
    table#tasks th:nth-child(10),
    table#tasks td:nth-child(10),
    table#tasks th:nth-child(11) ~ th,
    table#tasks td:nth-child(11) ~ td{
      display:none
    }
  `
})
export class ToDoListComponent implements OnInit {

  constructor(
    private matDialog:MatDialog,
    private psql:PostgresService,
    private misc:MiscService,
  ){}

  public taskFormDialogRef:MatDialogRef<ToDoFormComponent>
  public sampleData:taskViewInterface[] = [];
  public taskColumns:string[] = [];

  ngOnInit(): void {
    this.psql.getColumnHeaders('task_view').subscribe(data => {
      this.taskColumns = data;
      this.taskColumns = this.misc.insertArrayAtIndex(this.taskColumns,["Options"],10)
      console.log(this.taskColumns);
    });
    this.psql.getAllTaskByID(1).subscribe(data => {
      console.log(data)
      this.sampleData = data;
    });
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
    
  }

}
