import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  private _data:BehaviorSubject<string> = new BehaviorSubject<string>(''); // Use BehaviorSubject for initial value
  public data$:Observable<string> = this._data.asObservable();
  public sendData(data:string) {
    this._data.next(data);
  }

  private activeTableSubject = new Subject<string>(); // Use Subject or BehaviorSubject
  public sendActiveTableData(data:string):void {
    this.activeTableSubject.next(data);
  }
  public getActiveTable(): Observable<string> {
    return this.activeTableSubject.asObservable();
  }
}
