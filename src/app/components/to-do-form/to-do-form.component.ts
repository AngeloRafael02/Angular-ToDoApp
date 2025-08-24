import { ChangeDetectionStrategy, Component,Inject,OnInit } from '@angular/core';
import { PostgresService } from '../../services/postgres.service';
import { categoriesInterface, conditionInterface, dialogDataInterface, taskInterface, threatInterface } from '../../interfaces';
import { ReactiveFormsModule, FormBuilder,Validators, FormGroup, FormControl} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-to-do-form',
  providers:[PostgresService,provideNativeDateAdapter()],
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatDatepickerModule,
    MatGridListModule,
    ReactiveFormsModule, 
    CommonModule,
  ],
  templateUrl:'to-do-form.component.html',
  styles:`
    @use '../../../styles.scss' as c ;
    h2{margin-left:30px;}
    #note{ resize:none; }
    #formBox{ width:500px; padding:1%;background-color:c.$color4}
    .modalBTN{ 
      @include c.buttonColors;
      margin-left:1%; 
      margin-bottom:1%; 
    }
  `,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ToDoFormComponent implements OnInit{
 selected = 'option2';
test = "1";
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
    readonly dialog:MatDialog,
    private fb: FormBuilder,
    private psql:PostgresService,
    public taskFormDialogRef:MatDialogRef<ToDoFormComponent>,

    @Inject(MAT_DIALOG_DATA) public data:dialogDataInterface,
  ){
    this.taskCategories = data.allCat,
    this.taskConditions = data.allCond,
    this.taskThreatLevels = data.allThr,
    this.mode = data.option;
    this.taskID = data.ID;
  }
  

  ngOnInit(): void {
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
        this.taskForm.patchValue({
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
      //this.taskForm = new FormGroup({
      //  cat_id: new FormControl(1)
      //})
      });
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
        this.psql.updateOneTask(this.taskForm.value, this.taskID);
      }
      this.taskFormDialogRef.close()
      //setTimeout(function() {
      //  location.reload();
      //}, 1000);
    } else {
      console.log("Form is invalid");
    }
  }

}
