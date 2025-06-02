import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor(
    private http:HttpClient
  ) { }

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

  public DateUndefinedConverter(value:Date | undefined):string{
    if (value) {
      return value.toDateString();
    }
    return "1970-01-01";
  }

  public getFileContent(filePath: string): Observable<string> {
    return this.http.get(filePath, { responseType: 'text' });
  }
}
