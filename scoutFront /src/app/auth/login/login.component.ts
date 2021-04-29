import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  hide = true;
  loginForm: FormGroup;


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // recuperer les infos du user graceà l'email pour comparer
      this.userService
        .findByEmail(this.loginForm.controls['email'].value)
        .subscribe((infos) => {
          // stocker les reponses dans des variables
          infos.forEach((info) => {
            let userId = info.id;
            let userEmail = info.email;
            let userPassword = info.password;
            let lastName = info.lastName;
            let firstName = info.firstName;
            if (
              this.loginForm.controls['email'].value === userEmail &&
              // check token of password
              bcrypt.compareSync(this.loginForm.controls['password'].value, userPassword)
            ) {
              // si ok stocker id dans variable 
              let user = {
                id: userId,
                lastName : lastName,
                firstName : firstName,
              };
              // stocker dans le localstorage
              localStorage.setItem('user', JSON.stringify(user));
              // redirect
              this.router.navigate(['landingPage']);
            }
          });
        });
    }
  }



  private initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required),
    });
    
  }

  get emailInput() { return this.loginForm.get('email'); }
  get passwordInput() { return this.loginForm.get('password'); }  
 

 goRegister(){
   this.router.navigate([`register`,{previousUrl: 'login'}]);
}
}
