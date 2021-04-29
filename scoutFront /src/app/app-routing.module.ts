import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CreateVisitComponent } from './components/create-visit/create-visit.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ResumeVisitComponent } from './components/resume-visit/resume-visit.component';
import { CollectComponent  } from './components/collect/collect.component';
import { CaseComponent } from './dashboard/case/case.component';
import { IndexComponent } from './dashboard/index/index.component';
import { VisitComponent } from './dashboard/visit/visit.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { MyListCaseComponent } from './components/my-list-case/my-list-case.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ParamsComponent } from './components/params/params.component';

const routes: Routes = [

  {​​​​​​​​ path: '', component: WelcomeComponent }​​​​​​​​,
  {​​​​​​​​ path: 'login', component: LoginComponent }​​​​​​​​,
  {​​​​​​​​ path: 'register', component: RegisterComponent }​​​​​​​​,
  {​​​​​​​​ path: 'createVisit', component: CreateVisitComponent }​​​​​​​​,
  {​​​​​​​​ path: 'landingPage', component: LandingPageComponent }​​​​​​​​,
  {​​​​​​​​ path: 'profil', component: ProfilComponent }​​​​​​​​,
  {​​​​​​​​ path: 'params', component: ParamsComponent }​​​​​​​​,
  {​​​​​​​​ path: 'resumeVisit/:id', component: ResumeVisitComponent }​​​​​​​​,
  {​​​​​​​​ path: 'collect/:id', component: CollectComponent }​​​​​​​​,
  {​​​​​​​​ path: 'about', component: AboutComponent }​​​​​​​​,
  {​​​​​​​​ path: 'myListCase', component: MyListCaseComponent }​​​​​​​​,
  
  {​​​​​​​​ path: 'dashboard', component: IndexComponent,
          children:[
            {​​​​​​​​ path: 'case', component: CaseComponent }​​​​​​​​,
            {​​​​​​​​ path: 'visit', component: VisitComponent }​​​​​​​​,
          ]
  }​​​​​​​​,
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
