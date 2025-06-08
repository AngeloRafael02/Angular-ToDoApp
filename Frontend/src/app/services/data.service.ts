import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  private _data:BehaviorSubject<string> = new BehaviorSubject<string>(''); // Use BehaviorSubject for initial value
  public data$:Observable<string> = this._data.asObservable();
  public sendData(data: any) {
    this._data.next(data);
  }
}
