import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToDoListComponent } from '../to-do-list/to-do-list.component';
import { taskViewInterface } from '../../interfaces';


@Component({
  selector: 'app-to-do-finished',
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
  templateUrl: '../../templates/to-do-list.template.html',
  styleUrls: ['../../styles/to-do-list.styles.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ToDoFinishedComponent extends ToDoListComponent implements OnInit,OnChanges,OnDestroy {
  override tableID:string='finished';
  

  override ngOnInit(): void {
    this.psql.getAllFinishedTaskByID(this.nUserID).subscribe(data => {
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
        }566
      });
    }
  }

}
