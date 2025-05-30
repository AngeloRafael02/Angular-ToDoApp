import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

export const routes: Routes = [
    {path:'', redirectTo:'/about', pathMatch:'full'},  
    {path:'about',component:AboutComponent},
    {path:'summary', loadComponent: () => import('./components/summary/summary.component').then(c => c.SummaryComponent)},
    {path:'**',component:ErrorPageComponent}
];