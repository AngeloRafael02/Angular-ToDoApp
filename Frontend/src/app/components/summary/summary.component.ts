import { Component,OnInit } from '@angular/core';
import { Color, LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { MatButtonModule } from '@angular/material/button';

import { chartDataInterface } from '../../interfaces';
import { PostgresService } from '../../services/postgres.service';
import { forkJoin } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  standalone:true,
  selector: 'app-summary',
  imports: [
    NgxChartsModule,
    MatButtonModule
  ],
  templateUrl:'summary.component.html',
  styles: `
    @use '../../../styles.scss' as c;
    .chartContainer{
      display: flex; /* Enables flexbox for the container */
      justify-content: space-around; /* Distributes space evenly around items */
      /* Or use: justify-content: space-between; for space between items,
        or justify-content: flex-start; if you want them to align to the left */
      align-items: flex-start; /* Aligns items to the start of the cross-axis (top) */
      flex-wrap: wrap; /* Allows charts to wrap to the next line if the screen is too small */
    }
    ngx-charts-pie-chart {
      margin-top: 0px;
      max-width: 30%; 
    }
    #resetTableBTN{
      @include c.buttonColors;
      position: absolute; /* This takes the button out of normal flow */
      z-index: 10; /* Ensure it's on top of other content */
      top: 10px;
      left: 30px;
    }
  `
})
export class SummaryComponent implements OnInit {
  private UserID = 1

  // CHART CONFIG
  public view: [number,number] = [400, 200];
  public loading: boolean = true;
  public error: string | null = null;
  public gradient: boolean = true;
  public showLegend: boolean = false;
  public showLabels: boolean = true;
  public legendPosition:LegendPosition = LegendPosition.Below;
  public isDoughnut: boolean = false; // Set to true for a doughnut chart
  public arcWidth: number = 0.25; // For doughnut chart
  public explodeSlices: boolean = false;
  public tooltipDisabled: boolean = false;
  public doughnut: boolean = false; // Alias for isDoughnut
  public readonly colorScheme: Color = { 
    domain: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF00FF'],
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
};


  public taskGROUPBYCategories:chartDataInterface[];//=[{column:'TestBed',count:1},{column:'Test2',count:2},{column:'Test',count:1}];
  public taskGROUPBYConditions:chartDataInterface[];
  public taskGROUPBYThreatLevel:chartDataInterface[];
  constructor(
    private psql:PostgresService,
    private data:DataService
  ){

  }

  ngOnInit(): void {
    this.loadChartData()
  }

  loadChartData(): void {
    this.loading = true;
    this.error = null;
    forkJoin([
      this.psql.getTaskGroupedByCategories(this.UserID),
      this.psql.getTaskGroupedByStatus(this.UserID),
      this.psql.getTaskGroupedByThreatLevel(this.UserID)
    ]).subscribe({
      next: ([data1, data2, data3]:[chartDataInterface[],chartDataInterface[],chartDataInterface[]]) => {
        this.taskGROUPBYCategories =  data1;
        this.taskGROUPBYConditions =  data2;
        this.taskGROUPBYThreatLevel = data3;
        this.loading = false;
      },
      error: (err:string) => {
        console.error('Error fetching chart data:', err);
        this.error = 'Failed to load chart data. Please try again later.';
        this.loading = false;
      }
    });
  }

  // Optional: Event handlers for chart interactions
  public onSelect(event:{name:string,value:string,label:string}): void {
    if (event.label.toString().toLowerCase()==='finished'){
      this.data.sendActiveTableData('Finished');
    } else if (event.label.toString().toLowerCase()==='cancelled'){
      this.data.sendActiveTableData('Cancelled');
    } else {
      this.data.sendActiveTableData('Main');
      this.data.sendData(event.name)
    }
    
    console.log('Item clicked', JSON.parse(JSON.stringify(event)));
  }

  public resetTable(){
    this.data.sendActiveTableData('Main');
    this.data.sendData('')
  }

  onActivate(event: any): void {
    //console.log('Activate', JSON.parse(JSON.stringify(event)));
  }

  onDeactivate(event: any): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(event)));
  }

}
