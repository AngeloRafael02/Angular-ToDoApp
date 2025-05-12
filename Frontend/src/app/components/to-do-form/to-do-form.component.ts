import { Component,Inject,OnInit } from '@angular/core';
import { PostgresService } from '../../services/postgres.service';
import { categoriesInterface, conditionInterface, dialogDataInterface, taskInterface, threatInterface } from '../../interfaces';
import { ReactiveFormsModule, FormBuilder,Validators, FormGroup, FormControl} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-to-do-form',
  providers:[PostgresService],
  imports: [
    MatButtonModule,
    ReactiveFormsModule, 
    CommonModule,
  ],
  template:`
  <div id="formBox">
    <h2 mat-dialog-title>Task</h2>
    <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
      <div mat-dialog-content>
        <label for="title">Title: </label>
        <input type="text"  id="title" formControlName="title">
        <br><br>
        <label for="note">Note: </label>
        <textarea id="note" formControlName="note"></textarea>
        <br><br>
        <label for="category">Category: </label>
        <select id="category" formControlName="cat_id">
          <option *ngFor="let category of taskCategories" value={{category.id}}>{{category.cat}}</option>
        </select>
        <br><br>
        <label for="prio">Priority: </label>
        <input type="number" min="0" id="prio" formControlName="prio">
        <br><br>
        <label for="threat_level">Threat Level: </label>
        <select id="threat_level" formControlName="threat_id">
          <option *ngFor="let threat of taskThreatLevels" value="{{threat.id}}">{{threat.level}}</option>
        </select>
        <br><br>
        <label for="status">Status: </label>
        <select id="status" formControlName="stat_id">
          <option *ngFor="let status of taskConditions" value="{{status.id}}">{{status.stat}}</option>
        </select>
        <br><br>
        <label for="deadline">Deadline:</label>
        <input type="date" id="deadline" formControlName="deadline" value="{{this.DeadlineStrValue}}">  
        <br><br>
      </div>
      <div mat-dialog-actions align="left">
        <button mat-flat-button class="modalBTN" type="submit">Submit</button>
      </div>
    </form>
  </div>
  `,
  styles:`
    @use '../../../styles.scss' as c ;
    #note{ resize:none; }
    #formBox{ width:500px; padding:1%; }
    .modalBTN{ 
      @include c.buttonColors;
      margin-left:1%; 
      margin-bottom:1%; 
    }
  `
})
export class ToDoFormComponent implements OnInit{
  
  public mode:string = '';
  public taskID:number = 0;
  public DeadlineStrValue:string ='';

  public taskForm:FormGroup = new FormGroup({
      id: new FormControl<number | null>(null), 
      title: new FormControl<string>('', Validators.required),
      note: new FormControl<string>(''),
      cat_id: new FormControl<number>(1, Validators.required),
      prio: new FormControl<number>(1),
      threat_id: new FormControl<number>(1,Validators.required),
      stat_id: new FormControl<number>(1, Validators.required),
      created_at: new FormControl<Date>(new Date()),
      last_edited: new FormControl<Date>(new Date()),
      deadline: new FormControl(new Date().toLocaleString()),
      owner_id: new FormControl<number>(1, Validators.required),
  });
  public taskCategories:categoriesInterface[] = [];
  public taskConditions:conditionInterface[] = [];
  public taskThreatLevels:threatInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private psql:PostgresService,

    @Inject(MAT_DIALOG_DATA) public data:dialogDataInterface,
  ){
    this.mode = data.option;
    this.taskID = data.ID;
  }

  ngOnInit(): void {
    this.psql.getAllCategories().subscribe(data => this.taskCategories = data);
    this.psql.getAllConditions().subscribe(data => this.taskConditions = data);
    this.psql.getAllThreats().subscribe(data => this.taskThreatLevels = data);
    this.taskForm = this.fb.group({ 
      title:["", [Validators.required, Validators.maxLength(50)]],
      note:["",Validators.maxLength(255)],
      cat_id:[1,Validators.required],
      prio:[null, Validators.min(0)],
      threat_id:[1, Validators.required],
      stat_id:[1, Validators.required],
      created_at:[new Date(),Validators.required],
      last_edited:[new Date(),Validators.required],
      deadline:[''],
      owner_id:[1]
    });
    if (this.mode == 'update'){
      this.psql.getOneTaskByID(this.taskID).subscribe(data => {
        this.taskForm.setValue({
          title:data.Title,
          note:data.Description,
          cat_id:data.CID,
          prio:data.Priority,
          threat_id:data["TID"],
          stat_id:data.SID,
          created_at:data["Created At"],
          last_edited:data["Last Edited"],
          deadline:data.Deadline,
          owner_id:data.UID
        });
        this.DeadlineStrValue = data.Deadline.toString().slice(0,10); //workaround for deadline value not appearing in <input>
      });
    } else if (this.mode == 'new'){
      this.taskForm.get('stat_id')?.disable();
    }
  }

  onSubmit():void {
    if (this.taskForm.valid) {
      const deadlineInput:string = this.taskForm.value.deadline
      const date:Date = new Date(deadlineInput);
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(999); 
      this.taskForm.patchValue({ 
        cat_id: parseInt(this.taskForm.value.cat_id),
        deadline: !isNaN(date.getTime()) ? date.toLocaleString():null,
        owner_id:1
      });
      
      let input:taskInterface = this.taskForm.value;
      console.log(input)
      if (this.mode == 'new'){
        console.log(this.taskForm.value);
        this.psql.addTask(this.taskForm.value);
      } else if (this.mode == 'update'){ //mode = update
        alert("not new");
        this.psql.updateOneTask(this.taskForm.value, this.taskID);
      }
    } else {
      console.log("Form is invalid");
    }
  }

}
