//reference: https://g.co/gemini/share/b0b6015f84ab

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button'; 

export interface AlertDialogData {
  message: string;
  showYesNoButtons: boolean;
}

@Component({
  selector: 'app-alert-modal',
  imports: [
    MatButtonModule
],
  template: `
  <div id="alertBox">
    <h2 mat-dialog-title>Alert</h2>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions align="right">
      @if (data.showYesNoButtons) {
        <button mat-button (click)="onNoClick()" class="modalBTN">No</button>
        <button mat-button cdkFocusInitial (click)="onYesClick()" class="modalBTN">Yes</button>
      } @else {
        <button mat-button cdkFocusInitial (click)="onOkClick()" class="modalBTN">OK</button>
      }
    </div>
  </div>
  
  `,
  styles: `
    @use '../../../styles.scss' as c ;
    #alertBox { 
      width:auto;padding: 15px 20px 15px 20px; 
    }
    .modalBTN { 
      @include c.buttonColors;
      margin-left:1%; 
      margin-bottom:1%; 
    }
  `
})
export class AlertModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData
  ) {}

  onOkClick(): void {
    this.dialogRef.close(true); // Close with 'true' indicating OK
  }

  onYesClick(): void {
    this.dialogRef.close(true); // Close with 'true' indicating Yes
  }

  onNoClick(): void {
    this.dialogRef.close(false); // Close with 'false' indicating No
  }
}
