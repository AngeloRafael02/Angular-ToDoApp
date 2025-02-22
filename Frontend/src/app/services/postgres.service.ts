import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostgresService {

  constructor() { }

  public ToDoListSampleData(){
    let datas= [
      ["id","Task Title"],
      [1,"Finish This ToDoList"],
      [2,"Study C"]
    ];
    return datas;
  }
}
