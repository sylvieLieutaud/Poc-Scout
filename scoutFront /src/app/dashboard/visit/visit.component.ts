import {AfterViewInit, Component, ViewChild,OnInit } from '@angular/core';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { VisitService } from 'src/app/services/visit.service';
import { Visit } from 'src/app/models/visit.model';
import { VisitFormDialogComponent } from 'src/app/dashboard/visit/visit-form-dialog/visit-form-dialog.component';
import { VisitDeleteDialogComponent } from 'src/app/dashboard/visit/visit-delete-dialog/visit-delete-dialog.component';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class VisitComponent implements OnInit,AfterViewInit {
  columnsToDisplay: string[] = ['id', 'visitName', 'status'];
  dataSource : MatTableDataSource<Visit>;
  expandedElement: Visit | null;
  visit: Visit;

  constructor( private visitService: VisitService,
    public dialog: MatDialog, 
    public router: Router, 
    public route: ActivatedRoute) { }

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  
  ngOnInit(): void {
    this.getListVisit();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getListVisit(){
      this.visitService.getAll().subscribe((data)=>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }
  //dialog de formulaire (update)
  openDialogForm(element:Visit): void {
    const dialogRef = this.dialog.open(VisitFormDialogComponent, {
      width: '50%',
      height: '50%',
      data: {visitName: element.visitName,
            idCase: element.idCase,
          }
    });
    console.log(element);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //update de l'affaire
      console.log(result);
      this.visitService.update(element.id,result).subscribe();
      this.reload();
    });
  }
  openDialogDelete(element:Visit) {
    const dialogRef = this.dialog.open(VisitDeleteDialogComponent, {
      width: '40%',
      height: '30%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      //delete de l'affaire
      if (result===true){
        this.visitService.delete(element.id).subscribe();
      }
      this.reload();
    });
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(VisitFormDialogComponent, {
      width: '50%',
      height: '50%',
      data: {visitName: '',
            idCase: '',
      }
});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //create nue nouvelle affaire
      console.log(result);
      this.visitService.create(result).subscribe();
      this.reload();
    });
  }

  reload() {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./'], { relativeTo: this.route });
    }  


}
