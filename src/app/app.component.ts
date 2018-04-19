import { Component, OnInit, NgModule } from '@angular/core';
import { RouterModule, Router} from '@angular/router';

import { CompteService } from './service/compte/compte.service';
//import { EtatCompte } from './model/EtatCompte';

import { Compte } from './model/compte';

// import { ListePatientsComponent } from './vue/liste-patients/liste-patients.component';
// import { CompteLoginComponent } from './vue/Compte-login/Compte-login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Ma Migraine';
  selection : number = 0;

  mesmigraines            : boolean = false;
  mespatients             : boolean = false;
  monmedecin              : boolean = false;
  consoleAdmin            : boolean = false;
  consoleAdminMedicament  : boolean = false;
  consoleAdminFacteur     : boolean = false;

  compte : Compte;
  
  constructor(private compteService : CompteService,
              private router:Router
    ) {

     //localStorage.clear();
     //localStorage.setItem('EtatCompte', EtatCompte.aucun.toString());
    }
    ngOnInit() {
      this.Actualisation();
    }
    
    public Actualisation()
    {
      this.compteService.compte.subscribe(res => this.compte = res);
      console.log('compte : ',this.compte);
      if (this.compte.IDWeb == 0)
      {
        console.log('valeur 0');
        this.mesmigraines             = false;
        this.mespatients              = false;
        this.monmedecin               = false;
        this.consoleAdmin             = false;
        this.consoleAdminMedicament   = false;
        this.consoleAdminFacteur      = false;
      } 
      else
      {
        if (this.compte.Type == 1)
        {
          this.mesmigraines             = false;
          this.mespatients              = true;
          this.monmedecin               = false;
          this.consoleAdmin             = false;
          this.consoleAdminMedicament   = false;
          this.consoleAdminFacteur      = false;
        } 
        else if (this.compte.Type == 2)
        {
          this.mesmigraines             = true;
          this.mespatients              = false;
          this.monmedecin               = true;
          this.consoleAdmin             = false;
          this.consoleAdminMedicament   = false;
          this.consoleAdminFacteur      = false;
        }
        else if (this.compte.Type == 0)
        {
          this.mesmigraines             = false;
          this.mespatients              = false;
          this.monmedecin               = false;
          this.consoleAdmin             = true;
          this.consoleAdminMedicament   = true;
          this.consoleAdminFacteur      = true;
        }
      } 
    }



  // onselectAccueil(){
  //   this.selection = 1;
  // }
  // onselectInfo(){
  //   this.selection = 2;
  // }
  // onselectCompte(){
  //   this.selection = 3;
  // }
}
