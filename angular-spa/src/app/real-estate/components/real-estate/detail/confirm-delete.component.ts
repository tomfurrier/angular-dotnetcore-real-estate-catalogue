import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-dialog',
  template: `<h2 mat-dialog-title>Hirdetés törlése.</h2>
  <mat-dialog-content>Biztos törli a hirdetést?</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Nem</button>
    <button mat-button [mat-dialog-close]="true">Igen</button>
  </mat-dialog-actions>`
})
export class ConfirmDeleteDialogComponent {}
