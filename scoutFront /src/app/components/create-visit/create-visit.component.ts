import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { VisitService } from '../../services/visit.service';
import { CaseService } from 'src/app/services/case.service';
import { Case } from '../../models/case.model';


@Component({
  selector: 'app-create-visit',
  templateUrl: './create-visit.component.html',
  styleUrls: ['./create-visit.component.css'],
})

export class CreateVisitComponent implements OnInit {
  userLogin;
  visitForm: FormGroup;
  options: Case[] = [];
  filteredOptions: Observable<Case[]>;
  caseNumber: string = '';
  idCase:number=0;
  id:number;

  constructor(
    private visitService: VisitService,
    private caseService: CaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.userLogin = JSON.parse(localStorage.getItem('user'));
    //filtre pour autocomplete
    this.filteredOptions = this.visitForm.controls.caseName.valueChanges.pipe(
      startWith(''),
      //requête (vers bd pour recuper la liste des affaires) sera lancé quand user tape 2 de lettre (input)
      map((val) => (val.length == 2 ? this.getAllCases(val) : []))
    );
    console.log(this.userLogin);
    
  }

  getAllCases(val): Case[] {
    this.options = [];
    this.caseService.getAllFiltre(val).subscribe(
      (data) => {
        data.forEach((element) => {
          this.options.push(element);
        });
      },(error) => {
        console.log(error);
      }
    );
    console.log(this.options);
    return this.options;
  }
  findCaseNumber(value) {
    this.options.forEach((element) => {
      // si l'affaire existe dans le bd
      if (element.caseName === value) {
        this.caseNumber = element.caseNumber;
        this.idCase = element.id;
      }
    });
    // mettre la valeur dans le visitForm
    this.visitForm.controls["caseNumber"].setValue(this.caseNumber);
  }
  onSubmit() {
    if (this.visitForm.valid) {
      // si c'est une affaire existante 
      if (this.idCase !== 0) {
        var visit = {
          "visitName": this.visitForm.controls["visitName"].value,
          "idCase": this.idCase,
          "idUser": this.userLogin.id
        }
        this.visitService.create(visit).subscribe(data=>{
          this.router.navigate([`resumeVisit/${data.id}`,{previousUrl: 'createVisit'}]);
        });

      // sinon -> create une nouvelle affaire afin de récuperer son id
      } else {
          var caseObj = {
          "caseName": this.visitForm.controls["caseName"].value,
          "caseNumber":this.visitForm.controls["caseNumber"].value,
          "idUser": this.userLogin.id
        }
        // create une nouvelle affaire
       this.caseService.create(caseObj).subscribe((data:Case) =>{
          //recuperer son id
          this.idCase = data.id;
          var visit = {
            "visitName": this.visitForm.controls["visitName"].value,
            "idCase": this.idCase,
            "idUser": this.userLogin.id
          }
          // create une nouvelle visite avec idCase
          this.visitService.create(visit).subscribe(data=>{
          alert('La visite est bien crée!');
          //redirect to resume page
          this.router.navigate([`resumeVisit/${data.id}`,{previousUrl: 'createVisit'}]);
          });
      });
      }
    }
  }

  private initForm() {
    this.visitForm = new FormGroup({
      visitName: new FormControl('', Validators.required),
      caseName: new FormControl('', Validators.required),
      caseNumber: new FormControl('',Validators.min(3)),
    });
  }
}
