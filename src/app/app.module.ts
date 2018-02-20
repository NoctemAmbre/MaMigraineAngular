import { BrowserModule } from '@angular/platform-browser';
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { CompteLoginComponent } from './vue/Compte-login/Compte-login.component';
//import { ListePatientsComponent } from './vue/liste-patients/liste-patients.component';
import { CompteService } from './service/compte/compte.service';
import { PatientService } from './service/patient/patient.service';
import { MedecinService } from './service/medecin/medecin.service';
import { MedicamentService } from './service/medicament/medicament.service';
import { FacteurService } from './service/facteur/facteur.service';
import { JsonService } from './service/json/json.service';
import { SyntheseService } from './service/synthese/synthese.service';


import { AppRoutingModule } from './vue/app-rooting.module';
import { HTTPIntercepteur } from './service/intercepteur/HTTPIntercepteur';
import { CompteChangemotdepassComponent } from './vue/compte-changemotdepass/compte-changemotdepass.component';
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
import { MedecinInformationComponent } from './vue/medecin-information/medecin-information.component'
import { PatientOrdonnanceComponent } from './vue/patient-ordonnance/patient-ordonnance.component';
import { MedicamentGestionComponent } from './vue/medicament-gestion/medicament-gestion.component';
import { CompteNouveauComponent } from './vue/Compte-nouveau/compte-nouveau.component';
import { PatientTableauComponent } from './vue/patient-tableau/patient-tableau.component';
import { PatientFacteursComponent } from './vue/patient-facteurs/patient-facteurs.component';
import { FacteurGestionComponent } from './vue/facteur-gestion/facteur-gestion.component';


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
    PatientOrdonnanceComponent,
    MedicamentGestionComponent,
    PatientCourbesComponent,
    PatientTableauComponent,
    PatientFacteursComponent,
    FacteurGestionComponent,
    ],
  imports: [
    HttpModule,
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    ChartsModule,
    NgbModule.forRoot(),
    //BootstrapModalModule,
    //EasyUIModule,
    AppRoutingModule,
    // RouterModule.forRoot([ 
      // {
      //   path:'',
      //   redirectTo: 'home',
      //   pathMatch: 'full'
      // },
      // {
      //   path:'home',
      //   component : AppComponent
      // },
      // {
      //   path:'accueil',
      //   component : AccueilComponent
      // },
      // {
      //   path:'nouveau',
      //   component : CompteNouveauComponent
      // },
      // {
      //   path:'affichage',
      //   component : CompteInformationComponent
      // },
      // {
      //   path:'modification',
      //   component : CompteModificationComponent
      // },
      // {
      //   path:'login',
      //   component : CompteLoginComponent
      // },
      // {
      //   path:'mespatients',
      //   component : MedecinMespatientsComponent
      // },
      // {
      //   path:'mespatients/ordonnance',
      //   component : PatientOrdonnanceComponent,
      //   outlet :'outlerordonnance'
      // },
      // {
      //   path:'mespatients/patientinfo',
      //   component : PatientInformationComponent,
      //   outlet :'outlerpatient'
      // },
      // {
      //   path:'prospec',
      //   component : ProspecComponent
      // },
      // {
      //   path:'infoGeneral',
      //   component : InfogeneralComponent
      // },
      // {
      //   path:'monmedecin',
      //   component : PatientmonMedecinComponent
      // },
      // {
      //   path:'mesmigraines',
      //   component : PatientMesmigrainesComponent
      // },
      // {
      //   path:'**',
      //   component : ProspecComponent
      // },
    // ]),
  ],
  //providers: [{provide:HTTP_INTERCEPTORS, useClass:HTTPIntercepteur, multi:true}],
  providers: [CompteService,PatientService,MedecinService,MedicamentService,FacteurService, SyntheseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
