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

  public dateFormatHelper(deadline:string):string{
    if (deadline == null){
      return  '';
    } else {
      return deadline || deadline.trim() !== '' ? deadline.toString().slice(0,10) : '';

    }
  }

  public capitalizeFirstLetter(str:string):string {
    if (str.length === 0) {
      return ""; // Handle empty strings
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public ModifyThreatLevelCellColor(threat:string):string{
    switch (threat){
      case 'Low': return 'greenCell';
      case 'Medium': return 'yellowCell';
      case 'High': return 'greenCell';
      case 'Alarming': return 'redCell';
      case 'Inevitable': return 'aquaCell';
      default: return 'whiteCell'
    }
  }

  public ModifyStatusCellColor(status:string): string {
    switch (status){
      case 'Unfinished': return 'greyCell';
      case 'In Progress': return 'yellowCell';
      case 'Finished': return 'greenCell';
      case 'Cancelled': return 'redCell';
      case 'Delayed': return 'aquaCell';
      case 'Continuous': return 'lightblueCell';
      case 'On Hold': return 'coralCell';
      case 'Speculation': return 'bluevioletCell';
      default: return 'whiteCell'
    }
  }

  public RowColorPerDeadline(date:Date){
    const dateString:Date = date
    if (dateString == null) {
      return 'whiteRow';
    }
    
    const inputDate:Date = new Date(dateString);
    inputDate.setHours(0, 0, 0, 0);
    const today:Date = new Date();
    today.setHours(0, 0, 0, 0);
    const timeDifference:number = today.getTime() - inputDate.getTime();
    const daysDifference:number = timeDifference / (1000 * 60 * 60 * 24);
  
    if (daysDifference === 0) {
      return 'redRow';
    } else if (daysDifference >= -5 && daysDifference < 0) {
      return 'orangeRow';
    } else if (daysDifference < -5) {
      return 'greenRow';
    } else if (daysDifference >= 1) {
      return 'blackRow';
    } else {
      return 'whiteRow';
    }
  }

}
