import { NgModule } from '@angular/core';
import { RouterModule, Routes} from  '@angular/router';

import { CompteInformationComponent } from './compte-information/compte-information.component';
import { CompteModificationComponent } from './compte-modification/compte-modification.component';
import { CompteLoginComponent } from './Compte-login/Compte-login.component';
import { AppComponent } from './../app.component';
import { InfogeneralComponent } from './infogeneral/infogeneral.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MedecinMespatientsComponent } from './medecin-mespatients/medecin-mespatients.component';
import { PatientOrdonnanceComponent } from './patient-ordonnance/patient-ordonnance.component';
import { PatientInformationComponent } from './patient-information/patient-information.component';
import { ProspecComponent } from './prospec/prospec.component';
import { PatientmonMedecinComponent } from './patient-monmedecin/patient-monmedecin.component';
import { PatientMesmigrainesComponent } from './patient-mesmigraines/patient-mesmigraines.component';
import { CompteNouveauComponent } from './Compte-nouveau/compte-nouveau.component';
import { PatientFacteursComponent } from './patient-facteurs/patient-facteurs.component';
import { AdministrateurConsoleComponent } from './administrateur-console/administrateur-console.component';
import { AdministrateurConsolemedicamentComponent } from './administrateur-consolemedicament/administrateur-consolemedicament.component';
import { AdministrateurConsolefacteurComponent } from './administrateur-consolefacteur/administrateur-consolefacteur.component';

const routes: Routes = [
        // {
        //     path: '',
        //     component: AppComponent
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
          path:'modification',
          component : CompteModificationComponent
        },
        {
          path:'affichage',
          component : CompteInformationComponent
        },
        {
          path:'login',
          component : CompteLoginComponent
        },
        {
          path:'facteurs',
          component : PatientFacteursComponent
        },
        {
          path:'infoGeneral',
          component : InfogeneralComponent
        },
        {
          path:'mespatients',
          component : MedecinMespatientsComponent
        },
        {
          path:'mesfacteurs',
          component : PatientFacteursComponent
        },
        {
          path:'mesmedicaments',
          component : PatientOrdonnanceComponent
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
        {
          path:'consoleAdmin',
          component : AdministrateurConsoleComponent
        },
        {
          path:'consoleAdminMedicament',
          component : AdministrateurConsolemedicamentComponent
        },
        {
          path:'consoleAdminFacteur',
          component : AdministrateurConsolefacteurComponent
        },
        // {
        //   path:'**',
        //   component : ProspecComponent
        // },


      ];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}