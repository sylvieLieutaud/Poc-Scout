import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CreateVisitComponent } from './components/create-visit/create-visit.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CaseComponent } from './dashboard/case/case.component';
import { IndexComponent } from './dashboard/index/index.component';
import { DialogDeleteComponent } from './dashboard/case/dialog-delete/dialog-delete.component';
import { DialogFormComponent } from './dashboard/case/dialog-form/dialog-form.component';
import { VisitComponent } from './dashboard/visit/visit.component';
import { VisitFormDialogComponent } from './dashboard/visit/visit-form-dialog/visit-form-dialog.component';
import { VisitDeleteDialogComponent } from './dashboard/visit/visit-delete-dialog/visit-delete-dialog.component';
import { CollectComponent } from './components/collect/collect.component';
import { DialogPhotoComponent } from './components/collect/dialog-photo/dialog-photo.component';
import { DialogVideoComponent } from './components/collect/dialog-video/dialog-video.component';
import { DialogMapComponent } from './components/collect/dialog-map/dialog-map.component';
import { ResumeVisitComponent } from './components/resume-visit/resume-visit.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { MyListCaseComponent } from './components/my-list-case/my-list-case.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ParamsComponent } from './components/params/params.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CreateVisitComponent,
    NavBarComponent,
    LandingPageComponent,
    CaseComponent,
    IndexComponent,
    DialogDeleteComponent,
    DialogFormComponent,
    VisitComponent,
    VisitFormDialogComponent,
    VisitDeleteDialogComponent,
    CollectComponent,
    DialogPhotoComponent,
    DialogVideoComponent,
    DialogMapComponent,
    ResumeVisitComponent, 
    LoginComponent, 
    RegisterComponent, AboutComponent, MyListCaseComponent,
    ProfilComponent, ParamsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  entryComponents:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
