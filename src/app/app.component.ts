import { Component, OnInit,NgZone, OnDestroy } from '@angular/core';
import { RouterOutlet,RouterModule, Router, NavigationEnd} from '@angular/router';
import { MatDialog,MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { trigger, transition, style, query, group, animate } from '@angular/animations';

import { filter, forkJoin, Subject, Subscription, takeUntil } from 'rxjs';

import { ClockComponent } from './components/clock/clock.component';
import { ToDoFormComponent } from './components/to-do-form/to-do-form.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { categoriesInterface, conditionInterface, dialogDataInterface, threatInterface } from './interfaces';
import { PostgresService } from './services/postgres.service';
import { ToDoFinishedComponent } from './components/to-do-finished/to-do-finished.component';
import { ToDoCancelledComponent } from './components/to-do-cancelled/to-do-cancelled.component';
import { DataService } from './services/data.service';
import { slideTable,slideTo } from './app.animations';

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
    ToDoFinishedComponent,
    ToDoCancelledComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations:[   
    trigger('routeAnimations', [
      transition('aboutSection => summarySection', slideTo('right')),
      transition('summarySection => aboutSection', slideTo('left')),
    ]),
    trigger('slideAnimation', [
      transition('Main => Finished', slideTable('right')),
      transition('Finished => Main', slideTable('left')),
      transition('Main => Cancelled', slideTable('right')),
      transition('Cancelled => Main', slideTable('left')),
      transition('Finished => Cancelled', slideTable('left')),
      transition('Cancelled => Finished', slideTable('right')),
    ])
  ]
})
export class AppComponent implements OnInit,OnDestroy{
  public nUserID:number = 1;
  private idleCallbackId: number | undefined;
  private destroy$ = new Subject<void>();
  currentUrl: string = '';
  routerSubscription: Subscription;
  activeTableSubscription:Subscription;

  public currentRoute:string='';
  public matDialogRef: MatDialogRef<ToDoFormComponent>;
  public taskCategories:categoriesInterface[] = [];
  public taskConditions:conditionInterface[] = [];
  public taskThreatLevels:threatInterface[] = [];
  public activeTable:string ='Main';
  public title = 'Frontend';

  constructor(
    private router:Router,
    private ngZone: NgZone,
    private matDialog: MatDialog,
    private psql:PostgresService,
    private data:DataService
  ) {}

  public ngOnInit(): void {
    this.scheduleIdleWork();
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl = event.url.substring(1);
    });
    this.activeTableSubscription = this.data.getActiveTable().subscribe((data)=>{
      this.activeTable = data
    })
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

