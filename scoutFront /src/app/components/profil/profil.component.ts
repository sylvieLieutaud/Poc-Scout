import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { OrganisationService } from 'src/app/services/organisation.service';
import { User } from '../../models/user.model';
import { Organisation } from '../../models/organisation.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: User = {} as User;
  org : Organisation = {} as Organisation;

  constructor(  private userService: UserService,
    private orgService: OrganisationService,
    private router: Router,
    private route: ActivatedRoute,
) { }

  ngOnInit(): void {
    let userLogin = JSON.parse(localStorage.getItem('user'));
    this.userService.get(userLogin.id).subscribe(data=>{
      this.user = data;
      this.orgService.get(data.idOrg).subscribe(result=>{
        this.org=result;
      })
    })
  }

  

}
