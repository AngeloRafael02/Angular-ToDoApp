import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor() { }

  public insertArrayAtIndex(mainArray:string[], insertArray:string[], index:number):string[] {
    if (index < 0 || index > mainArray.length) {
      return mainArray; // Or throw an error if you prefer
    }
    const result:string[] = [
      ...mainArray.slice(0, index),
      ...insertArray,
      ...mainArray.slice(index),
    ];
    return result;
  }
}
