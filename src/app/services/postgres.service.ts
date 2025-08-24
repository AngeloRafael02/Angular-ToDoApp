import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { categoriesInterface, chartDataInterface, conditionInterface, taskInterface, taskViewInterface, threatInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostgresService {

  private nestJS:string = 'http://localhost:3000';

  constructor(
    private http:HttpClient
  ) { }


  public getAllCategories():Observable<categoriesInterface[]>{
    return this.http.get<categoriesInterface[]>(`${this.nestJS}/Misc/allCat`);
  }

  public getAllConditions():Observable<conditionInterface[]>{
    return this.http.get<conditionInterface[]>(`${this.nestJS}/Misc/allCond`);
  }

  public getAllThreats():Observable<threatInterface[]>{
    return this.http.get<threatInterface[]>(`${this.nestJS}/Misc/allThreats`);
  }

  public getAllTaskByID(id:number):Observable<taskViewInterface[]>{
    return this.http.get<taskViewInterface[]>(`${this.nestJS}/task/all/${id}`)
  }

  public getAllFinishedTaskByID(id:number):Observable<taskViewInterface[]>{
    return this.http.get<taskViewInterface[]>(`${this.nestJS}/task/allFinished/${id}`)
  }
  
  public getAllCancelledTaskByID(id:number):Observable<taskViewInterface[]>{
    return this.http.get<taskViewInterface[]>(`${this.nestJS}/task/allCancelled/${id}`)
  }

  public getOneTaskByID(id:number):Observable<taskViewInterface>{
    return this.http.get<taskViewInterface>(`${this.nestJS}/task/${id}`)
  }

  public getColumnHeaders(table:string):Observable<string[]>{
    return this.http.get<string[]>(`${this.nestJS}/misc/col/${table}`);
  }

  public getTaskGroupedByCategories(uid:number):Observable<chartDataInterface[]>{
    return this.http.get<chartDataInterface[]>(`${this.nestJS}/misc/catGrouped/${uid}`);
  }
  public getTaskGroupedByStatus(uid:number):Observable<chartDataInterface[]>{
    return this.http.get<chartDataInterface[]>(`${this.nestJS}/misc/statGrouped/${uid}`);
  }
  public getTaskGroupedByThreatLevel(uid:number):Observable<chartDataInterface[]>{
    return this.http.get<chartDataInterface[]>(`${this.nestJS}/misc/threatGrouped/${uid}`);
  }

  public addTask(taskObj:taskInterface):Subscription{
    return this.http.post(`${this.nestJS}/task`,taskObj).subscribe(data => {
      console.log(data);
    });
  }

  public updateOneTask(taskObj:taskInterface, ID:number):Subscription{
    return this.http.put(`${this.nestJS}/task/${ID}`,taskObj).subscribe(data => {
      console.log(data);
    });
  }

  public finishOneTask(ID:number):Subscription{
    return this.http.put(`${this.nestJS}/task/finish/${ID}`,{}).subscribe(data=>{
      console.log(data)
    });
  }

  public deleteOneTask(taskID:number):Subscription{
    return this.http.delete(`${this.nestJS}/task/${taskID}`).subscribe(data => {
      console.log(data);
    });
  }
}
