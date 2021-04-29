import { Component, OnInit,ViewChild } from '@angular/core';
import { CaseService } from '../../services/case.service';
import { Case } from '../../models/case.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-my-list-case',
  templateUrl: './my-list-case.component.html',
  styleUrls: ['./my-list-case.component.css']
})


export class MyListCaseComponent implements OnInit {

  public dataSource : MatTableDataSource<Case>;
  columnsToDisplay = ['caseName', 'caseNumber','createdAt','updatedAt'];
  expandedElement: Case | null;
  case: Case;
  public dataSourceEmpty: MatTableDataSource<Case>;

  constructor(private caseService: CaseService) { }


  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;


  ngOnInit(): void {
    // recuperer le id du user connecté dans le localstorage
    var userId = JSON.parse(localStorage.getItem('user'));
    // passer la variable contenant l'id vers le service
    this.caseService.findByUser(userId.id).subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
  });
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
