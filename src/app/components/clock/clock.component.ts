import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-clock',
  imports: [DatePipe],
  template: `
  <div id="clockContainer">
    <h3> Today: {{date | date:'fullDate'}} {{hour}}:{{minute}}:{{second}} {{ampm}}</h3>
  </div>
  `,
  styles: `
    @use '../../../styles.scss' as c;
    h3{
      text-align:center; 
      padding:20px 0px 20px 0px; 
      color:c.$mainTextColor;
    }
  `
})
export class ClockComponent implements OnInit, OnDestroy  {
  private daysArray:string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  private intervalId: any;
  public date = new Date();
  public hour:any;
  public minute:string="";
  public second:string="";
  public ampm:string="";
  public day:string="";

  ngOnInit(): void {
    this.intervalId = setInterval(()=> { 
     const date = new Date();
     this.updateDate(date);
    },1000);//this will call the update method in each second
    this.day = this.daysArray[this.date.getDay()];
    //getDay() returns the day in integer format, from 0 to 6 then takes the corresponding date from the daysArray
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateDate(date:Date):void{
    const hours:number = date.getHours(); // gets the hours from the date
    this.ampm = hours >= 12 ? 'PM' : 'AM';
    this.hour = hours % 12; //makes the times in hours format
    this.hour = this.hour ? this.hour: 12; //if the hour is 0 then 12 is assigned to it.
    this.hour = this.hour < 10 ? '0' + this.hour: this.hour; // if our is single digit, add 0 in front of it

    const minutes:number = date.getMinutes(); //gets the minutes from the date
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();

    const seconds:number = date.getSeconds(); //gets the seconds from the date
    this.second = seconds < 10 ? '0' + seconds : seconds.toString();
  }
}
