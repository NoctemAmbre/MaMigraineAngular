import { BrowserModule } from '@angular/platform-browser';
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//import { BootstrapModalModule } from 'ng2-bootstrap-modal';
//import { EasyUIModule } from './../easyui/components/easyui/easyui.module';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { CompteLoginComponent } from './vue/Compte-login/Compte-login.component';
//import { ListePatientsComponent } from './vue/liste-patients/liste-patients.component';
import { CompteService } from './service/compte/compte.service';
import { PatientService } from './service/patient/patient.service';
import { JsonService } from './service/json/json.service';

import { AppRoutingModule } from './vue/app-rooting.module';
import { HTTPIntercepteur } from './service/intercepteur/HTTPIntercepteur';
import { CompteChangemotdepassComponent } from './vue/compte-changemotdepass/compte-changemotdepass.component';
import { CompteNouveauComponent } from './vue/compte-nouveau/compte-nouveau.component';
import { CompteInformationComponent } from './vue/compte-information/compte-information.component';
import { CompteGestionComponent } from './vue/compte-gestion/compte-gestion.component';
import { CompteModificationComponent } from './vue/compte-modification/compte-modification.component';
import { InfogeneralComponent } from './vue/infogeneral/infogeneral.component';
import { ProspecComponent } from './vue/prospec/prospec.component';
import { MedecinMespatientsComponent } from './vue/medecin-mespatients/medecin-mespatients.component';
import { PopupComponent } from './vue/popup/popup.component';
import { PatientmonMedecinComponent } from './vue/patient-monmedecin/patient-monmedecin.component';
import { PatientMesmigrainesComponent } from './vue/patient-mesmigraines/patient-mesmigraines.component';
import { AccueilComponent } from './vue/accueil/accueil.component';
import { PatientInformationComponent } from './vue/patient-information/patient-information.component';
import { PatientCourbesComponent } from './vue/patient-courbes/patient-courbes.component';
import { MedecinInformationComponent } from './vue/medecin-information/medecin-information.component';
import { MedecinService } from './service/medecin/medecin.service';
import { PatientOrdonnanceComponent } from './vue/patient-ordonnance/patient-ordonnance.component';


@NgModule({
  declarations: [
    AppComponent,
    CompteLoginComponent,
    //ListePatientsComponent,
    CompteChangemotdepassComponent,
    CompteNouveauComponent,
    CompteInformationComponent,
    CompteGestionComponent,
    CompteModificationComponent,
    InfogeneralComponent,
    ProspecComponent,
    MedecinMespatientsComponent,
    PopupComponent,
    PatientmonMedecinComponent,
    PatientMesmigrainesComponent,
    AccueilComponent,
    PatientInformationComponent,
    MedecinInformationComponent,
    PatientCourbesComponent,
    PatientOrdonnanceComponent,
    ],
  imports: [
    HttpModule,
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    ChartsModule,
    //BootstrapModalModule,
    //EasyUIModule,
    //AppRoutingModule
    RouterModule.forRoot([ 
      // {
      //   path:'',
      //   redirectTo: 'home',
      //   pathMatch: 'full'
      // },
      // {
      //   path:'home',
      //   component : AppComponent
      // },
      {
        path:'accueil',
        component : AccueilComponent
      },
      {
        path:'nouveau',
        component : CompteNouveauComponent
      },
      {
        path:'affichage',
        component : CompteInformationComponent
      },
      {
        path:'modification',
        component : CompteModificationComponent
      },
      {
        path:'login',
        component : CompteLoginComponent
      },
      {
        path:'mespatients',
        component : MedecinMespatientsComponent
      },
      {
        path:'mespatients/ordonnance',
        component : PatientOrdonnanceComponent,
        outlet :'outlerordonnance'
      },
      {
        path:'mespatients/patientinfo',
        component : PatientInformationComponent,
        outlet :'outlerpatient'
      },
      {
        path:'prospec',
        component : ProspecComponent
      },
      {
        path:'infoGeneral',
        component : InfogeneralComponent
      },
      {
        path:'monmedecin',
        component : PatientmonMedecinComponent
      },
      {
        path:'mesmigraines',
        component : PatientMesmigrainesComponent
      },
      // {
      //   path:'**',
      //   component : ProspecComponent
      // },
    ]),
  ],
  //providers: [{provide:HTTP_INTERCEPTORS, useClass:HTTPIntercepteur, multi:true}],
  providers: [CompteService,PatientService,MedecinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
