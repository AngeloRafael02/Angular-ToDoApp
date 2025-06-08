import { Component,ContentChild,Input,OnInit, TemplateRef } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../services/loading.service';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

@Component({
  selector: 'app-spinner',
  imports: [MatProgressSpinnerModule,MatProgressSpinnerModule, AsyncPipe, NgTemplateOutlet],
  template: `
    @if(loading$ | async) {
      <div class="spinner-container">
        @if(customLoadingIndicator) {
        <ng-container 
          *ngTemplateOutlet="customLoadingIndicator" />

        } @else {
        <mat-spinner />
        }
      </div>
    }
  `,
  styles: `
    .spinner-container {
      position: fixed;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.32);
      z-index: 2000;
    }
  `
})
export class SpinnerComponent implements OnInit {

  public loading$: Observable<boolean>;

  @Input()
  public detectRouteTransitions = false;

  @ContentChild("loading")
  public customLoadingIndicator: TemplateRef<any> | null = null;

  constructor(
    private loadingService: LoadingService, 
    private router: Router
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    if (this.detectRouteTransitions) {
      this.router.events
        .pipe(
          tap((event) => {
            if (event instanceof RouteConfigLoadStart) {
              this.loadingService.loadingOn();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.loadingService.loadingOff();
            }
          })
        )
        .subscribe();
    }
  }
  
}
