import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-visit-delete-dialog',
  templateUrl: './visit-delete-dialog.component.html',
  styleUrls: ['./visit-delete-dialog.component.css']
})
export class VisitDeleteDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
