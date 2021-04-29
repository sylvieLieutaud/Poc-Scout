import {AfterViewInit, Component, ViewChild,OnInit,ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { VisitService } from 'src/app/services/visit.service';
import { Visit } from 'src/app/models/visit.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})


export class LandingPageComponent implements OnInit {
  userLogin;
  dataSource : MatTableDataSource<Visit>;
  obs: Observable<Visit[]>;
  visitNull:boolean = false;

  constructor(private visitService: VisitService,
            private changeDetectorRef: ChangeDetectorRef, 
            public router: Router) { }

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;

  ngOnInit(): void {
    let userLogin = JSON.parse(localStorage.getItem('user'));
    this.changeDetectorRef.detectChanges();
    this.visitService.findByUser(userLogin.id).subscribe((data)=>{
      if(data.length===0){
        this.visitNull=true;
      }
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });
  }
  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
  redirect(id){
    this.router.navigate([`resumeVisit/${id}`])
  }
}
