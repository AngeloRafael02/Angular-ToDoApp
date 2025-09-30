import { Component, OnDestroy, OnInit,OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ToDoListComponent } from '../to-do-list/to-do-list.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { taskViewInterface } from '../../interfaces/task.interface';
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
  styleUrls: ['../../styles/to-do-list.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoCancelledComponent extends ToDoListComponent implements OnInit,OnChanges,OnDestroy {
  override tableID:string='cancelled';


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

}

