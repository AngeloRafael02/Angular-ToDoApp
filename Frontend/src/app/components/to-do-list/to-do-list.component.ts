import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';

import { ToDoFormComponent } from '../to-do-form/to-do-form.component';
import { PostgresService } from '../../services/postgres.service';
import { MiscService } from '../../services/misc.service';
import { taskViewInterface } from '../../interfaces';

@Component({
  selector: 'app-to-do-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  template:`  
    <table mat-table [dataSource]="sampleData" class="mat-elevation-z8" id="tasks">
      <!--- Note that these columns can be defined in any order.
            The actual rendered columns are set as a property on the row definition" -->

      <!-- Position Column -->
      <ng-container matColumnDef="ID">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let element"> {{element.ID}} </td>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="Title">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Title </th>
        <td mat-cell *matCellDef="let element"> {{element.Title}} </td>
      </ng-container>

      <!-- Weight Column -->
      <ng-container matColumnDef="Description">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Description </th>
        <td mat-cell *matCellDef="let element"> {{element.Description}} </td>
      </ng-container>

      <ng-container matColumnDef="Category">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Category </th>
        <td mat-cell *matCellDef="let element"> {{element.Category}} </td>
      </ng-container>

      <!-- Symbol Column -->
      <ng-container matColumnDef="Priority">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Priority </th>
        <td mat-cell *matCellDef="let element"> {{element.Priority}} </td>
      </ng-container>

      <!-- Symbol Column -->
      <ng-container matColumnDef="Threat Level">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Threat Level </th>
        <td mat-cell *matCellDef="let element"> {{element['Threat Level']}} </td>
      </ng-container>

            <!-- Symbol Column -->
      <ng-container matColumnDef="Status">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Threat Level </th>
        <td mat-cell *matCellDef="let element"> {{element['Threat Level']}} </td>
      </ng-container>

      <ng-container matColumnDef="Deadline">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Deadline </th>
        <td mat-cell *matCellDef="let element"> {{element.Deadline.toString().slice(0,10)}} </td>
      </ng-container>
      <ng-container matColumnDef="Created At">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> Created At </th>
        <td mat-cell *matCellDef="let element"> {{element['Created At']}} </td>
      </ng-container>

      <ng-container matColumnDef="Last Edited">
        <th mat-header-cell *matHeaderCellDef> Last Edited </th>
        <td mat-cell *matCellDef="let element"> {{element['Last Edited']}} </td>
      </ng-container>

      <ng-container matColumnDef="Options">
        <th mat-header-cell *matHeaderCellDef>  Options </th>
        <td mat-cell *matCellDef="let element"> 
            <button (click)="finishTask(element.ID)">Finish</button>
            <button (click)="updateTask(element.ID)">Update</button>
            <button (click)="deleteTask(element.ID)">Delete</button>
        </td>
      </ng-container>

      <ng-container matColumnDef="SID">
        <th mat-header-cell *matHeaderCellDef> SID </th>
        <td mat-cell *matCellDef="let element"> {{element.SID}} </td>
      </ng-container>

      <ng-container matColumnDef="TID">
        <th mat-header-cell *matHeaderCellDef> TID </th>
        <td mat-cell *matCellDef="let element"> {{element.TID}} </td>
      </ng-container>

      <ng-container matColumnDef="UID">
        <th mat-header-cell *matHeaderCellDef> UID </th>
        <td mat-cell *matCellDef="let element"> {{element.UID}} </td>
      </ng-container>

      <ng-container matColumnDef="CID">
        <th mat-header-cell *matHeaderCellDef> CID </th>
        <td mat-cell *matCellDef="let element"> {{element.CID}} </td>
      </ng-container>


      <tr mat-header-row *matHeaderRowDef="taskColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: taskColumns;" [ngClass]="getRowColorClass(row)"></tr>
    </table>
    <mat-paginator [pageSizeOptions]="[5, 10, 20]"
                 showFirstLastButtons
                 aria-label="Select page of periodic elements">
    </mat-paginator>
  `,
  styles:`
    table {width: 100%;}
    td,th{text-align: center;}
    table#tasks td:first-child,
    table#tasks th:first-child,
    table#tasks th:nth-child(9),
    table#tasks td:nth-child(9),
    table#tasks th:nth-child(10),
    table#tasks td:nth-child(10),
    table#tasks th:nth-child(11) ~ th,
    table#tasks td:nth-child(11) ~ td{ display:none }
    .green-row { background-color: lightgreen; color:black; }
    .yellow-row { background-color: yellow; color:black;}
    .orange-row { background-color: orange; color:black; }
    .red-row { background-color: lightcoral; color:black;  }
    .black-row { background-color: black; color:white;}
  `
})
export class ToDoListComponent implements OnInit, AfterViewInit {

  constructor(
    private matDialog:MatDialog,
    private psql:PostgresService,
    private misc:MiscService,
  ){}

  public taskFormDialogRef:MatDialogRef<ToDoFormComponent>
  public sampleData:taskViewInterface[] = [];
  public taskColumns:string[] = [];
  @ViewChild(MatPaginator) 
  private paginator: MatPaginator;
  public dataSource = new MatTableDataSource<taskViewInterface>(this.sampleData);


  ngOnInit(): void {
    this.psql.getColumnHeaders('task_view').subscribe(data => {
      this.taskColumns = data;
      this.taskColumns = this.misc.insertArrayAtIndex(this.taskColumns,["Options"],10)
    });
    this.psql.getAllTaskByID(1).subscribe(data => {
      this.sampleData = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
  
  public getRowColorClass(row: taskViewInterface): string {
    switch (row['Threat Level'].toString()){
      case 'Low':
        return 'green-row';
      case 'Medium':
        return 'yellow-row';
      case 'High':
        return 'orange-row';
      case 'Alarming':
        return 'red-row';
      case 'Inevitable':
        return 'black-row';
      default:
        return 'white-row'
    }
  }

}
