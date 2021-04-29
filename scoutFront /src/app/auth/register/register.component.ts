import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { OrganisationService } from 'src/app/services/organisation.service';
import * as bcrypt from 'bcryptjs';

// import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  hideToo = true;
  registerForm: FormGroup;
  orgForm: FormGroup;
  userLogin;
  public title;
  
  constructor(  private userService: UserService,
                private orgService: OrganisationService,
                public router: Router,
                public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    let previousUrl = this.route.snapshot.paramMap.get('previousUrl');
    if (previousUrl === 'login'){
      this.title ='INSCRIPTION';
    }else{
      this.title ='MODIFIER MON PROFIL';
    }
    this.userLogin = JSON.parse(localStorage.getItem('user'));
    this.initForm();
  }

  passwordMatchValidator(registerForm: FormGroup) {
    return registerForm.get('password').value === registerForm.get('confirmPassword').value
       ? null : {'mismatch': true};
  }
  

  private initForm() {
    // if user update his profil
    if (this.userLogin !== null){
      this.userService.get(this.userLogin.id).subscribe(data=>{
          this.registerForm = new FormGroup({
              lastName: new FormControl(data.lastName, Validators.required),
              firstName: new FormControl(data.firstName, Validators.required),
              email: new FormControl(data.email,[Validators.required,Validators.email]),
              password: new FormControl('',Validators.required),
              confirmPassword: new FormControl('',[Validators.required]), 
          },
        {validators:this.passwordMatchValidator},
      );
          this.orgService.get(data.idOrg).subscribe(result=>{
            console.log(result.orgName);
              this.orgForm = new FormGroup({
                orgName: new FormControl(result.orgName,Validators.required),
                orgCity: new FormControl(result.orgCity,Validators.required),
              });
          })
      })
    } // if a new user
    else {
      this.registerForm = new FormGroup({
        lastName: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        email: new FormControl('',[Validators.required,Validators.email]),
        password: new FormControl('',Validators.required),
        confirmPassword: new FormControl('',[Validators.required]), 
      },
        {validators:this.passwordMatchValidator},
      );
      this.orgForm = new FormGroup({
        orgName: new FormControl('',Validators.required),
        orgCity: new FormControl('',Validators.required),
      });
    }

  }
  onSubmit() {
    if (this.orgForm.valid ) {
      this.orgService.create(this.orgForm.value).subscribe(result => {
        //hash password
        const salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(this.registerForm.controls['password'].value, salt); 

        if( this.registerForm.value){
          let userObj = {
          firstName: this.registerForm.controls['firstName'].value,
          lastName: this.registerForm.controls['lastName'].value,
          email: this.registerForm.controls['email'].value,
          password: hash,
          idOrg: result.id
        }
      this.userService.create(userObj).subscribe(result => {
      }); 
      alert('Inscription réussie!')
      this.redirect();
      }   
      });
    };
}
redirect(){
  this.router.navigate([`login`]);
}

get lastNameInput() { return this.registerForm.get('lastName'); }  
get firstNameInput() { return this.registerForm.get('firstName'); }  
get emailInput() { return this.registerForm.get('email'); }
get passwordInput() { return this.registerForm.get('password'); }  
get confirmPasswordInput() { return this.registerForm.get('confirmPassword'); } 
get orgNameInput() { return this.orgForm.get('orgName'); }  
get orgCityInput() { return this.orgForm.get('orgCity'); }  




}