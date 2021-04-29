import { Component, OnInit } from '@angular/core';
import { VisitService } from 'src/app/services/visit.service';
import { Visit } from 'src/app/models/visit.model';
import { Router,ActivatedRoute } from '@angular/router';
import { CaseService } from 'src/app/services/case.service';
import { Case } from 'src/app/models/case.model';

@Component({
  selector: 'app-resume-visit',
  templateUrl: './resume-visit.component.html',
  styleUrls: ['./resume-visit.component.css']
})
export class ResumeVisitComponent implements OnInit {
  visit: Visit = {} as Visit;
  case: Case = {} as Case;
  button = '';
  constructor(private VisitService: VisitService,
              private caseService: CaseService,
               public router: Router,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
    let previousUrl = this.route.snapshot.paramMap.get('previousUrl');
    if (previousUrl === 'createVisit'){
      this.button ='show';
    }
    let id = this.route.snapshot.params.id;
    this.VisitService.get(id).subscribe(result=>{
      this.visit = result;
      this.caseService.get(result.idCase).subscribe(result=>{
        this.case = result;
      })
    })
  }
  delete(id){
    // this.caseService.delete(this.case.id).subscribe();
    // this.VisitService.delete(id).subscribe();

  }

}
