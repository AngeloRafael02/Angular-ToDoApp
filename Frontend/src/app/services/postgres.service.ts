import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { categoriesInterface, conditionInterface, taskInterface, taskViewInterface } from '../interfaces';

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

  public getAllTaskByID(id:number):Observable<taskViewInterface[]>{
    return this.http.get<taskViewInterface[]>(`${this.nestJS}/task/all/${id}`)
  }

  public getOneTaskByID(id:number):Observable<taskViewInterface>{
    return this.http.get<taskViewInterface>(`${this.nestJS}/task/${id}`)
  }

  public getColumnHeaders(table:string):Observable<string[]>{
    return this.http.get<string[]>(`${this.nestJS}/misc/col/${table}`);
  }

  public addTask(taskObj:taskInterface){
    return this.http.post(`${this.nestJS}/task`,taskObj);
  }
}
