import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notify-dialog',
  templateUrl: './notify-dialog.component.html',
  styleUrls: ['./notify-dialog.component.css']
})
export class NotifyDialogComponent {

  categories = [
    {value: 'employed', viewValue: 'employed'},
    {value: 'unemployed', viewValue: 'unemployed'},
    {value: 'retired', viewValue: 'retired'},
    {value: 'student', viewValue: 'student'},
  ];

  public uploadImage: string;
  public processing: boolean;

  constructor(
    public dialogRef: MatDialogRef<NotifyDialogComponent>
    ) {}

  okClick(): void {
    this.dialogRef.close();
  }
}
