import { Component,Inject,OnInit } from '@angular/core';
import { PostgresService } from '../../services/postgres.service';
import { categoriesInterface, conditionInterface } from '../../interfaces';
import { ReactiveFormsModule, FormBuilder,Validators} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-to-do-form',
  providers:[PostgresService],
  imports: [
    ReactiveFormsModule, 
    CommonModule,
  ],
  template:`
  <div style="width:500px">
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
        <select id="category" >
          <option *ngFor="let category of taskCategories" value="{{category.id}}">{{category.cat}}</option>
        </select>
        <br><br>
        <label for="prio">Priority: </label>
        <input type="number" min="0" name="prio" id="prio" formControlName="prio">
        <br><br>
        <label for="status">Status: </label>
        <select id="status" >
            <option *ngFor="let status of taskConditions" value="{{status.id}}">{{status.stat}}</option>
        </select>
        <br><br>
        <label for="deadline">Deadline:</label>
        <input type="date" id="deadline" formControlName="deadline"> 
        <br><br>
      </div>
      <div mat-dialog-actions align="left">
            <button type="submit">Submit</button>
            <button (click)="closeDialog()">Close</button>
      </div>
    </form>
  </div>
  `,
  styles:`
    #note{ resize:none; }
  `
})
export class ToDoFormComponent implements OnInit{
  
  public mode:string = '';
  public taskID:number = 0;

  public taskForm:any;
  public taskCategories:categoriesInterface[] = []
  public taskConditions:conditionInterface[] = []

  constructor(
    private self:MatDialogRef<ToDoFormComponent>,
    private fb: FormBuilder,
    private psql:PostgresService,

    @Inject(MAT_DIALOG_DATA) option: string,
    @Inject(MAT_DIALOG_DATA) ID: number,
  ){
    this.mode = option;
    this.taskID = ID;
  }

  ngOnInit(): void {
    this.psql.getAllCategories().subscribe(data => this.taskCategories = data);
    this.psql.getAllConditions().subscribe(data => this.taskConditions = data);
    if (this.mode == 'new'){
      this.taskForm = this.fb.group({ 
        "title":["", [Validators.required, Validators.maxLength(50)]],
        "note":["",Validators.maxLength(255)],
        "cat_id":[1,Validators.required],
        "prio":[null, Validators.min(0)],
        "stat_id":[1, Validators.required],
        "created_at":[new Date(),Validators.required],
        "last_edited":[new Date(),Validators.required],
        "deadline":[new Date()],
        "owner_id":[1,Validators.required]
      });
    } else {
      this.taskForm = this.fb.group({ 
        "title":["", [Validators.required, Validators.maxLength(50)]],
        "note":["",Validators.maxLength(255)],
        "cat_id":[1,Validators.required],
        "prio":[null, Validators.min(0)],
        "stat_id":[1, Validators.required],
        "created_at":[new Date(),Validators.required],
        "last_edited":[new Date(),Validators.required],
        "deadline":[new Date()],
        "owner_id":[1,Validators.required]
      });
    }
  }

  onSubmit():void {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      // Here you can handle the form submission, e.g., send data to an API
    } else {
      console.log("Form is invalid");
    }
  }

  public closeDialog(){
    this.self.close(false);
  }
}
