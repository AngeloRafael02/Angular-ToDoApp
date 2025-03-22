import { Component,Inject,OnInit } from '@angular/core';
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
    <table>
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
          <td>{{item.Status}}</td>
          <td>{{item.Deadline}}</td>
          <td>{{item["Created At"]}}</td>
          <td>{{item["Last Edited"]}}</td>
          <td>
            <button (click)="updateTask(item.ID)">Update</button>
            <button (click)="deleteTask(item.ID)">Delete</button>
          </td>
          <td>{{item.CID}}</td>
          <td>{{item.SID}}</td>
          <td>{{item.UID}}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles:`
    table {width: 100%;}
    td{text-align: center;}
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
      this.taskColumns = this.misc.insertArrayAtIndex(this.taskColumns,["Options"],9)
      console.log(this.taskColumns);
    });
    this.psql.getAllTaskByID(1).subscribe(data => {
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

  }

}
