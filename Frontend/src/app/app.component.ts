import { Component } from '@angular/core';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { RouterOutlet } from '@angular/router';
import { ToDoFormComponent } from './components/to-do-form/to-do-form.component';
import { MatDialog,MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  imports: [
    ToDoListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public matDialogRef: MatDialogRef<ToDoFormComponent>;
  public title = 'Frontend';

  constructor(private matDialog: MatDialog) {}
  OpenModal() {
    this.matDialogRef = this.matDialog.open(ToDoFormComponent, {
      data: { option:'new', ID:0 },
      disableClose: false
    });

    this.matDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
      }
    });
  }

  CloseModal(){
    this.matDialogRef.close(false)
  }
}
