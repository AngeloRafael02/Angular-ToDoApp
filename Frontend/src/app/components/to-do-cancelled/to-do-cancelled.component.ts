import { Component, OnDestroy, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { ToDoListComponent } from '../to-do-list/to-do-list.component';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from '../../services/loading.service';
import { PostgresService } from '../../services/postgres.service';
import { MiscService } from '../../services/misc.service';
import { DataService } from '../../services/data.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { taskViewInterface } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-to-do-cancelled',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatFormField
  ],
  templateUrl: '../../templates/to-do-list.template.html',
  styleUrls: ['../../styles/to-do-list.styles.scss']
})
export class ToDoCancelledComponent extends ToDoListComponent implements OnInit,OnChanges,OnDestroy {
  override tableID:string='cancelled';

  constructor(
    override matDialog:MatDialog,
    override loadingService:LoadingService,
    override psql:PostgresService,
    override misc:MiscService,
    override data:DataService
  ){
    super(matDialog,loadingService,psql,misc,data)
    this.psql.getColumnHeaders('task_view').subscribe(data => {
      this.taskColumns = data;
    });
  }

  override ngOnInit(): void {
    this.psql.getAllCancelledTaskByID(this.nUserID).subscribe(data => {
      this.dataSource = new MatTableDataSource<taskViewInterface>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }


  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['nUserID']){
      this.dataSubscription = this.data.data$.subscribe((data) => {
        this.receivedData = data;
        if (data.trim().toLowerCase() !== 'finished'){
          this.chartFilter(data);
        }
      });
    }
  }

  public override updateTask(task: number): void {}
  public override finishTask(task: number): void {}
  public override deleteTask(task: number): void {}
}

