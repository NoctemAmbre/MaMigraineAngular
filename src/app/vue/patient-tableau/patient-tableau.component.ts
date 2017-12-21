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
  // ListeMigraine : Migraine[] = [];
  // ListeMedicament : Medicament[] = [];
  // ListeFacteurs : Facteur[] = [];
  NouvelleMigraine : Migraine = new Migraine();
  AffichageNouvelleMigraine : boolean = false;
  model: NgbDateStruct;
  date: {year: number, month: number};
  //currentRate = 6;

  constructor(private config: NgbAccordionConfig, private patientService:PatientService, private compteService:CompteService) {
    config.closeOthers = false;
    config.type = 'info';
   }

  
  ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    this.patientService.patient.subscribe(res => this.patient = res);
    this.NouvelleMigraine.MedicamentsPris = [];
    this.NouvelleMigraine.Facteurs = [];
    this.compte.MesMedicaments.forEach(medicament => {medicament.Selection = false;});
    this.compte.MesFacteurs.forEach(facteur => {facteur.Selection = false;});
    
    // this.patientService.compte = this.patient;
    // this.patientService.InformationPatient().subscribe(data => {
    //   this.patient = data.body as Compte;
    //   this.patientService.changePatient(this.patient);
    // }
    // );
    // this.ListeMigrainesPatient();
  }

  Aujourdui()
  {
  }

  // AjoutMedicament(medicament:Medicament)
  // {
  //   if (medicament.Selection)
  //   {
  //     if (!this.NouvelleMigraine.MedicamentsPris.includes(medicament)) this.NouvelleMigraine.MedicamentsPris.push(medicament);
  //   } 
  //   else this.NouvelleMigraine.MedicamentsPris.splice(this.NouvelleMigraine.MedicamentsPris.indexOf(medicament));

  //   console.log('Médicament pris : ',this.NouvelleMigraine.MedicamentsPris);
  //   console.log('mes médicaments : ',this.patient.MesMedicaments);
  // }

  AjoutMigraine()
  {
    this.AffichageNouvelleMigraine = true;
    //this.ListeMedicamentsPatient();
  }

  ValidationMigraine()
  {
    this.NouvelleMigraine.MedicamentsPris = [];
    this.NouvelleMigraine.Facteurs = [];
    this.compte.MesMedicaments.forEach(medicament => {if (medicament.Selection) this.NouvelleMigraine.MedicamentsPris.push(medicament);});
    this.compte.MesFacteurs.forEach(facteur => {if (facteur.Selection) this.NouvelleMigraine.Facteurs.push(facteur);});
    
    console.log(this.NouvelleMigraine);
    console.log('mes MedicamentsPris : ',this.NouvelleMigraine.MedicamentsPris);
    console.log('mes Facteurs : ',this.NouvelleMigraine.Facteurs);

    var patientEnvois : Compte = new Compte();
    patientEnvois.IDWeb = this.patient.IDWeb;
    patientEnvois.MesMigraines = [];
    patientEnvois.MesMigraines.push(this.NouvelleMigraine);

    this.patientService.compte = patientEnvois;
    
  }

  // ListeMigrainesPatient()
  // {
  //   let comptetEnvois : Compte = new Compte();
  //   if (!this.compte.Type)
  //   {
  //     comptetEnvois.IDWeb = this.compte.IDWeb;
      
  //     //this.patientService.changePatient(this.compte); //opération temporaire pour avoir un patient d'existant dans le service patient. J'y place le compte car sans quoi il est vide
  //   }
  //   else comptetEnvois.IDWeb = this.patient.IDWeb;

  //   this.patientService.compte = comptetEnvois;
  //   console.log('ce qu\'il y a dans le compte', comptetEnvois);
  //   this.patientService.ListeMigrainesDuPatient().subscribe(
  //     data => {
  //       //this.ListeMigraine = data.body;
  //       console.log('retour', data.body);
  //     });
  //   }

    // ListeMedicamentsPatient()
    // {
    //   let compteEnvois : Compte = new Compte();
    //   if (!this.compte.Type) compteEnvois.IDWeb = this.compte.IDWeb;
    //   else compteEnvois.IDWeb = this.patient.IDWeb;
      
    //   this.patientService.compte = compteEnvois;
  
    //   this.patientService.ListeMedicamentsDuPatient().subscribe(
    //   data => {
    //     //this.ListeMedicament = data.body;
    //     console.log('retour', data.body);
    //   });
    // }

    // ListeFacteursPatient()
    // {
    //   let compteEnvois : Compte = new Compte();
    //   if (!this.compte.Type) compteEnvois.IDWeb = this.compte.IDWeb;
    //   else compteEnvois.IDWeb = this.patient.IDWeb;
      
    //   this.patientService.compte = compteEnvois;
  
    //   this.patientService.ListeFacteursDuPatient().subscribe(
    //   data => {
    //     //this.ListeFacteurs = data.body;
    //     console.log('retour', data.body);
    //   });
    // }
}
