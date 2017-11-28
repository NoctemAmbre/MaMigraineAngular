import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CompteService } from './../../service/compte/compte.service';
import { PatientService } from './../../service/patient/patient.service';


//import { PopupComponent } from './../../vue/popup/popup.component';

import { Compte } from './../../model/compte';

@Component({
  selector: 'app-medecin-mespatients',
  templateUrl: './medecin-mespatients.component.html',
  styleUrls: ['./medecin-mespatients.component.css']
  //providers : [PatientService]
})
export class MedecinMespatientsComponent implements OnInit {
  compte : Compte;
  patient : Compte;
  Nomrecherche : string;
  ListPatient : Compte[];
  Selection : boolean = false;


  constructor(private compteService : CompteService,
              private patientService : PatientService,
              private router:Router
              ) { }

  ngOnInit() {
    
    this.patientService.patient.subscribe(resp => {this.patient = resp; console.log('le patient visible',resp);});
    this.compteService.compte.subscribe(resc => this.compte = resc);
    if (this.compte.IDWeb == 0) this.router.navigate(['prospec']);
    //this.patientService.changePatient(this.patient);
    this.compteService.changeCompte(this.compte);
  }

  cacher(){
    this.compte.Erreur = "";
  }

  InfoOuordonnance(Select : boolean)
  {
    this.Selection = Select;
  }

  onselect(compteAjouter : Compte) : void
  {
     this.ListPatient = null;
     this.compte.MesPatients = [];
     this.compte.MesPatients.push(compteAjouter);
     console.log('Mes patient à ajouter', this.compte);
     this.compteService.changeCompte(this.compte);
     this.compteService.AttributionPatient().subscribe(data => {
        this.compte = data.body;
        console.log('retour', data.body);
        this.compteService.changeCompte(this.compte);
    });
  }

  //on envois le compte Medecin avec un seul "MesPatient" celui sélectionné
  selectAffichage(compteAAfficher : Compte) : void
  {
    this.patient = compteAAfficher;
    this.patientService.changePatient(this.patient);
    let CompteAEnvoyer : Compte = new Compte();
    CompteAEnvoyer.IDWeb = this.compte.IDWeb;
    CompteAEnvoyer.Token = this.compte.Token;
    CompteAEnvoyer.MesPatients = [];
    CompteAEnvoyer.MesPatients.push(this.patient);
    
     this.patient = compteAAfficher;
     this.patientService.compte = CompteAEnvoyer;
     this.patientService.InformationPatient().subscribe(data => {
        this.patient = data.body;
        console.log('- 4 - ', this.patient);
        this.patientService.changePatient(this.patient);
        console.log('- 5 - ', this.patient);
       
        console.log('retour', data.body);
        // this.compteService.changeCompte(this.compte);
    });
  }

  RechercherNouveauPatient()
  {
      if (this.Nomrecherche != null && this.Nomrecherche.toString().length > 3 && this.patientService.Entravail == false){
        let CompteEnvois : Compte = new Compte();
        CompteEnvois.Nom = this.Nomrecherche;
        CompteEnvois.Token = this.compte.Token;
        this.patientService.compte = CompteEnvois;
        this.patientService.CherchePatients().subscribe(data => {
          this.ListPatient = data.body;
          this.patientService.Entravail = false;
          console.log('retour', data.body);
          if (data.body.length > 0) {   
            console.log(data.body);
          }
      });
    }
  }
}