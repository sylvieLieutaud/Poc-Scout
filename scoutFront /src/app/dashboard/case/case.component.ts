import { Component,OnInit } from '@angular/core';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { CaseService } from 'src/app/services/case.service';
import { Case } from 'src/app/models/case.model';
import { DialogFormComponent } from 'src/app/dashboard/case/dialog-form/dialog-form.component';
import { DialogDeleteComponent } from 'src/app/dashboard/case/dialog-delete/dialog-delete.component';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CaseComponent implements OnInit {
  public dataSource : MatTableDataSource<Case>;
  columnsToDisplay = ['id','caseName', 'caseNumber', 'status'];
  expandedElement: Case | null;
  case: Case;
  constructor( private caseService: CaseService,
                public dialog: MatDialog, 
                public router: Router, 
                public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getListCase();
   }
  getListCase(){
     this.caseService.getAll().subscribe(
    (data)=>{
        this.dataSource = new MatTableDataSource(data);
    }
  );
  console.log(this.dataSource);
  }
  openDialogForm(element:Case): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '50%',
      height: '50%',
      data: {caseName: element.caseName,
            caseNumber: element.caseNumber,}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //update de l'affaire
      console.log(result);
      this.caseService.update(element.id,result).subscribe();
      this.reload();
    });
  }
  openDialogDelete(element:Case) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '40%',
      height: '30%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      //delete de l'affaire
      if (result===true){
        this.caseService.delete(element.id).subscribe();
      }
      this.reload();
    });
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '50%',
      height: '50%',
      data: {caseName: '',
        caseNumber: '',}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //create nue nouvelle affaire
      console.log(result);
      this.caseService.create(result).subscribe();
      this.reload();
    });
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
