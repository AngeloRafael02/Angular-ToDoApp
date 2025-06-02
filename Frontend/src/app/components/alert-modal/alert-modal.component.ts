//reference: https://g.co/gemini/share/b0b6015f84ab

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'; 

export interface AlertDialogData {
  message: string;
  showYesNoButtons: boolean;
}

@Component({
  selector: 'app-alert-modal',
  imports: [
    CommonModule,
    MatButtonModule
  ],
  template: `
  <h2 mat-dialog-title>Alert</h2>
  <div mat-dialog-content>
    <p>{{ data.message }}</p>
  </div>
  <div mat-dialog-actions align="end">
    <ng-container *ngIf="data.showYesNoButtons; else okButton">
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button cdkFocusInitial (click)="onYesClick()">Yes</button>
    </ng-container>
    <ng-template #okButton>
      <button mat-button cdkFocusInitial (click)="onOkClick()">OK</button>
    </ng-template>
  </div>
  `,
  styles: ``
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
