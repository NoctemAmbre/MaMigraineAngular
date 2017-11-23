import { NgModule } from '@angular/core';
import { RouterModule, Routes} from  '@angular/router';

import { CompteInformationComponent } from './compte-information/compte-information.component';
import { ListePatientsComponent } from './liste-patients/liste-patients.component';
import { CompteNouveauComponent } from './Compte-nouveau/compte-nouveau.component';
import { CompteModificationComponent } from './compte-modification/compte-modification.component';
import { CompteLoginComponent } from './Compte-login/Compte-login.component';
import { AppComponent } from './../app.component';
import { InfogeneralComponent } from './infogeneral/infogeneral.component';

const routes: Routes = [
        // {
        //     path: '',
        //     component: AppComponent
        // },    
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
          path:'list',
          component : ListePatientsComponent
        },
        {
          path:'infoGeneral',
          component : InfogeneralComponent
        }
      ];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}