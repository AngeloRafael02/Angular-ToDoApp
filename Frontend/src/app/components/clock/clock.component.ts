import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-clock',
  imports: [],
  template: `
  <div id="clockContainer">
    <h3> Current Time: {{hour}}:{{minute}}:{{second}} {{ampm}}</h3>
  </div>
  `,
  styles: `
    h3{text-align:center; padding:20px 0px 20px 0px; color:white;}
  `
})
export class ClockComponent implements OnInit  {
  private daysArray:string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  private date = new Date();
  public hour:any;
  public minute:string="";
  public second:string="";
  public ampm:string="";
  public day:string="";

  ngOnInit(): void {
    setInterval(()=> { 
     const date = new Date();
     this.updateDate(date);
    },1000);//this will call the update method in each second
    this.day = this.daysArray[this.date.getDay()];
    //getDay() returns the day in integer format, from 0 to 6 then takes the corresponding date from the daysArray
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
