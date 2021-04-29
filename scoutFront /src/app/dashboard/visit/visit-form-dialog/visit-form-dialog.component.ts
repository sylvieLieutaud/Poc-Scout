import { Component, OnInit, Inject } from '@angular/core';
import { Visit } from 'src/app/models/visit.model';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-visit-form-dialog',
  templateUrl: './visit-form-dialog.component.html',
  styleUrls: ['./visit-form-dialog.component.css']
})
export class VisitFormDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<VisitFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Visit) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
