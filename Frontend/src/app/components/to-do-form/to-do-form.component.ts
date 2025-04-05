import { Component,Inject,OnInit } from '@angular/core';
import { PostgresService } from '../../services/postgres.service';
import { categoriesInterface, conditionInterface, dialogDataInterface, taskInterface } from '../../interfaces';
import { ReactiveFormsModule, FormBuilder,Validators} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
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
      <div mat-dialog-actions  align="left">
            <button mat-flat-button class="modalBTN" type="submit">Submit</button>&#9; 
            <button mat-flat-button class="modalBTN" (click)="closeDialog()">Close</button>
      </div>
    </form>
  </div>
  `,
  styles:`
    #note{ resize:none; }
    #formBox{ width:500px; padding:1%; }
    .modalBTN{margin-left:1%; margin-bottom:1%;}
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

    @Inject(MAT_DIALOG_DATA) public data:dialogDataInterface,
  ){
    this.mode = data.option;
    this.taskID = data.ID;
  }

  ngOnInit(): void {
    this.psql.getAllCategories().subscribe(data => this.taskCategories = data);
    this.psql.getAllConditions().subscribe(data => this.taskConditions = data);
    this.taskForm = this.fb.group({ 
      "title":["", [Validators.required, Validators.maxLength(50)]],
      "note":["",Validators.maxLength(255)],
      "cat_id":[1,Validators.required],
      "prio":[null, Validators.min(0)],
      "stat_id":[2, Validators.required],
      "created_at":[new Date().toISOString(),Validators.required],
      "last_edited":[new Date().toISOString(),Validators.required],
      "deadline":[new Date()],
      "owner_id":[1,Validators.required]
    });
    if (this.mode == 'update'){
      this.psql.getOneTaskByID(this.taskID).subscribe(data => {
        this.taskForm.setValue({
          title:data.Title,
          note:data.Description,
          cat_id:data.CID,
          prio:data.Priority,
          stat_id:data.SID,
          created_at:data["Created At"],
          last_edited:data["Last Edited"],
          deadline:data.Deadline,
          owner_id:data.UID
        });
      });
    }
  }

  onSubmit():void {
    if (this.taskForm.valid) {
      if (this.mode == 'new'){
        alert("??d")
        this.psql.addTask(this.taskForm.value);
      } else { //mode = update
        alert("not new");
        //this.psql.updateOneTask(this.taskForm.value, this.taskID);
      }
    } else {
      console.log("Form is invalid");
    }
  }

  public closeDialog(){
    this.self.close(false);
  }
}
