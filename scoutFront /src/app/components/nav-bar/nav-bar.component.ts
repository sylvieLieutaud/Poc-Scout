import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userId;
  userLogin={} as User;

  constructor(private userService: UserService,
              private location: Location,
              public router: Router,
              public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user'));
    this.userService.get(this.userId.id).subscribe(data=>{
      this.userLogin=data;
    })
  }

  goback() { 
    this.location.back();
  }

  logout(){
    if (window.confirm('Vous etes sur de vous déconnecter ?')){
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }
}
