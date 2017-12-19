import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';


import { PatientService } from './../../service/patient/patient.service'
import { Compte } from '../../model/compte';
import { CompteService } from '../../service/compte/compte.service';
import { Migraine } from '../../model/migraine';
import { Medicament } from '../../model/medicament';
import { Facteur } from '../../model/facteur';


const model = {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()};

@Component({
  selector: 'app-patient-tableau',
  templateUrl: './patient-tableau.component.html',
  styleUrls: ['./patient-tableau.component.css'],
  providers: [NgbAccordionConfig]
})
export class PatientTableauComponent implements OnInit {
  compte : Compte;
  patient : Compte;
  ListeMigraine : Migraine[] = [];
  ListeMedicament : Medicament[] = [];
  ListeFacteurs : Facteur[] = [];
  NouvelleMigraine : Migraine = new Migraine();
  AffichageNouvelleMigraine : boolean = false;
  model: NgbDateStruct;
  date: {year: number, month: number};
  //currentRate = 6;

  constructor(private config: NgbAccordionConfig, private patientService:PatientService, private compteService:CompteService) {
    config.closeOthers = true;
    config.type = 'info';
   }

  
  ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    this.patientService.patient.subscribe(res => this.patient = res);
   
    this.ListeMigrainesPatient();
  }

  Aujourdui()
  {
    
  }

  AjoutMigraine()
  {
    this.AffichageNouvelleMigraine = true;
    this.ListeMedicamentsPatient();
  }

  ListeMigrainesPatient()
  {
    let comptetEnvois : Compte = new Compte();
    if (!this.compte.Type)
    {
      comptetEnvois.IDWeb = this.compte.IDWeb;
      
      //this.patientService.changePatient(this.compte); //opération temporaire pour avoir un patient d'existant dans le service patient. J'y place le compte car sans quoi il est vide
    }
    else comptetEnvois.IDWeb = this.patient.IDWeb;

    this.patientService.compte = comptetEnvois;
    console.log('ce qu\'il y a dans le compte', comptetEnvois);
    this.patientService.ListeMigrainesDuPatient().subscribe(
      data => {
        this.ListeMigraine = data.body;
        console.log('retour', data.body);
      });
    }

    ListeMedicamentsPatient()
    {
      let compteEnvois : Compte = new Compte();
      if (!this.compte.Type) compteEnvois.IDWeb = this.compte.IDWeb;
      else compteEnvois.IDWeb = this.patient.IDWeb;
      
      this.patientService.compte = compteEnvois;
  
      this.patientService.ListeMedicamentsDuPatient().subscribe(
      data => {
        this.ListeMedicament = data.body;
        console.log('retour', data.body);
      });
    }

    ListeFacteursPatient()
    {
      let compteEnvois : Compte = new Compte();
      if (!this.compte.Type) compteEnvois.IDWeb = this.compte.IDWeb;
      else compteEnvois.IDWeb = this.patient.IDWeb;
      
      this.patientService.compte = compteEnvois;
  
      this.patientService.ListeFacteursDuPatient().subscribe(
      data => {
        this.ListeFacteurs = data.body;
        console.log('retour', data.body);
      });
    }
}
