import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  dialogTitle: string;
  dialogContent: string;
}

@Component({
  selector: 'app-confirm-delete-dialog',
  template: `<h2 mat-dialog-title>{{data.dialogTitle}}</h2>
  <mat-dialog-content>{{data.dialogContent}}</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Nem</button>
    <button mat-button [mat-dialog-close]="true">Igen</button>
  </mat-dialog-actions>`
})
export class ConfirmDeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
