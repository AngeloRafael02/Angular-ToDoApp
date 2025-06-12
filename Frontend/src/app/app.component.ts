import { Component, OnInit,NgZone, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink,RouterModule } from '@angular/router';
import { MatDialog,MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { trigger, transition, style, query, group, animate } from '@angular/animations';

import { ClockComponent } from './components/clock/clock.component';
import { ToDoFormComponent } from './components/to-do-form/to-do-form.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { categoriesInterface, conditionInterface, dialogDataInterface, taskViewInterface, threatInterface } from './interfaces';
import { PostgresService } from './services/postgres.service';
import { forkJoin, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    MatButtonModule, 
    MatButtonToggleModule,
    MatTabsModule,
    ToDoListComponent,
    ClockComponent,
    MatGridListModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations:[   
    trigger('routeAnimations', [
      transition('aboutSection => summarySection', slideTo('right')),
      transition('summarySection => aboutSection', slideTo('left')),
    ])
  ]
})
export class AppComponent implements OnInit,OnDestroy{
  public nUserID:number = 1;
  private idleCallbackId: number | undefined;
  private destroy$ = new Subject<void>();

  public matDialogRef: MatDialogRef<ToDoFormComponent>;
  public taskCategories:categoriesInterface[] = [];
  public taskConditions:conditionInterface[] = [];
  public taskThreatLevels:threatInterface[] = [];
  public title = 'Frontend';

  constructor(
    private ngZone: NgZone,
    private matDialog: MatDialog,
    private psql:PostgresService
  ) {}

  public ngOnInit(): void {
    this.scheduleIdleWork();
  }
  
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.idleCallbackId && 'cancelIdleCallback' in window) {
      window.cancelIdleCallback(this.idleCallbackId);
    }

  }

  private scheduleIdleWork(): void {
   if ('requestIdleCallback' in window) {
      this.ngZone.runOutsideAngular(() => {
        this.idleCallbackId = window.requestIdleCallback((deadline) => {
          this.processMainTask();
           if (deadline.timeRemaining() > 0) {
            this.scheduleIdleWork();
           }
        }, { timeout: 2000 }) 
      })
    } else {
      console.warn('requestIdleCallback is not supported. Using setTimeout as fallback.');
      setTimeout(() => {
        this.processAllIdleTasks();
      }, 0);
    }
  }

  private processMainTask():void{
    forkJoin({
      categories: this.psql.getAllCategories(),
      conditions: this.psql.getAllConditions(),
      threatLevels: this.psql.getAllThreats()
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next:(results)=>{
        this.taskCategories = results.categories;
        this.taskConditions = results.conditions;
        this.taskThreatLevels = results.threatLevels;
      }, error:(error)=>{
        console.error('Error fetching Selection Values:', error);
      },complete:()=>{
        console.log('forkJoin completed all data streams.');
      }
    });
  }

  private processAllIdleTasks():void{
    this.processMainTask();
  }

  public OpenModal() {
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

  public CloseModal(){
    this.matDialogRef.close(false)
  }

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}

function slideTo(direction: string) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%' })
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: '100%' }))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%' }))
      ])
    ])
  ];
}
