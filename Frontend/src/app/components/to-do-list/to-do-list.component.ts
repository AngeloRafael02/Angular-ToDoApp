import {  Component, Input, OnDestroy, OnInit,OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatFormField, MatLabel  } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ToDoFormComponent } from '../to-do-form/to-do-form.component';
import { PostgresService } from '../../services/postgres.service';
import { MiscService } from '../../services/misc.service';
import { categoriesInterface, conditionInterface, dialogDataInterface, taskViewInterface, threatInterface } from '../../interfaces';
import { LoadingService } from '../../services/loading.service';
import { AlertDialogData, AlertModalComponent } from '../alert-modal/alert-modal.component';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-to-do-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatFormField,
    MatLabel,
    MatInputModule,
  ],
  templateUrl:'to-do-list.component.html',
  styleUrls:['to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit,OnChanges,OnDestroy{

  constructor(
    public matDialog:MatDialog,
    public loadingService:LoadingService,
    public psql:PostgresService,
    public misc:MiscService,
    public data:DataService
  ){
    this.psql.getColumnHeaders('task_view').subscribe(data => {
      this.taskColumns = data;
      this.taskColumns = this.misc.insertArrayAtIndex(this.taskColumns,["Options"],10)
    });
  }

  @Input() public nUserID:number;
  @Input() public taskCategories:categoriesInterface[] = [];
  @Input() public taskConditions:conditionInterface[] = [];
  @Input() public taskThreatLevels:threatInterface[] = [];
  
  private tasks:taskViewInterface[] = [] 
  public tasksCount:number=0;
  public taskFormDialogRef:MatDialogRef<ToDoFormComponent>
  public taskColumns:string[] = [];
  public dataSource:MatTableDataSource<taskViewInterface> = new MatTableDataSource(this.tasks);
  public receivedData: string;
  public dataSubscription: Subscription;

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  ngOnInit():void {
    try {
      this.loadingService.loadingOn();

    } catch (error) {
      
    } finally {
      this.loadingService.loadingOff()
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nUserID']){
      this.psql.getAllTaskByID(this.nUserID).subscribe(data => {
        this.dataSource = new MatTableDataSource<taskViewInterface>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.tasksCount = data.length;
      });
      this.dataSubscription = this.data.data$.subscribe((data) => {
        this.receivedData = data;
        if (data.trim().toLowerCase() !== 'finished'){
          this.chartFilter(data);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  public updateTask(task:number):void{
    this.taskFormDialogRef = this.matDialog.open(ToDoFormComponent, {
      data: <dialogDataInterface>{ 
        allCat:this.taskCategories,
        allCond:this.taskConditions,
        allThr:this.taskThreatLevels,
        option:'update', 
        ID:task
      },
      disableClose: false,
      enterAnimationDuration:'250ms',
      exitAnimationDuration:'125ms'
    });
  }

  public applySearchFilter(event: Event):void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public applyCategoryFilter(category: string):void {
    this.dataSource.filter = category.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Go to the first page after filtering
    }
  }
  public chartFilter(searchTerm:string){
    this.dataSource.filter = searchTerm.trim().toLowerCase();
  }

  public deleteTask(ID:number):void{
    const dialogData:AlertDialogData= {
      message: 'Do you want to proceed with this action?',
      showYesNoButtons: true
    };
    const dialogRef = this.matDialog.open(AlertModalComponent, {
      width: '350px',
      data: dialogData,
      enterAnimationDuration:'250ms',
      exitAnimationDuration:'125ms'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The Yes/No dialog was closed with result:', result);
      if (result) {
        console.log('User clicked Yes');
        this.psql.deleteOneTask(ID);
        setTimeout(function() {
          location.reload();
        }, 1000);
      } else {
        console.log('User clicked No');
        // Perform action for No
      }
    });
  }

  public finishTask(ID:number):void{
    this.psql.finishOneTask(ID);
    setTimeout(function() {
      location.reload();
    }, 1000);
  }

  public deadlineFormatHelper(deadline:string):string{
    return this.misc.dateFormatHelper(deadline);
  }
  
  public getThreatLevelCellClass(threat:string): string {
    return this.misc.ModifyThreatLevelCellColor(threat);
  }

  public getStatusColorClass(status:string): string {
    return this.misc.ModifyStatusCellColor(status);
  }

  public evaluateDate(row:taskViewInterface):string {
    return this.misc.RowColorPerDeadline(row.Deadline);
  }

  public newTaskModal():void {
    this.taskFormDialogRef = this.matDialog.open(ToDoFormComponent, {
      data: <dialogDataInterface>{ 
        allCat:this.taskCategories,
        allCond:this.taskConditions,
        allThr:this.taskThreatLevels,
        option:'new', 
        ID:0 
      },
      disableClose: false,
      enterAnimationDuration:'250ms',
      exitAnimationDuration:'125ms'
    });
    this.taskFormDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
      }
    });
  }

  public closaTaskModal():void{
    this.taskFormDialogRef.close(false)
  }

}
