import { Component, OnInit } from '@angular/core';
import {NgbTimeStruct ,NgbDateStruct, NgbDateAdapter, NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';


import { PatientService } from './../../service/patient/patient.service'
import { Compte } from '../../model/compte';
import { CompteService } from '../../service/compte/compte.service';
import { Migraine } from '../../model/migraine';
import { Medicament } from '../../model/medicament';
import { Facteur } from '../../model/facteur';


// const dateDebut = {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()};
// const dateFin = {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()};

@Component({
  selector: 'app-patient-tableau',
  templateUrl: './patient-tableau.component.html',
  styleUrls: ['./patient-tableau.component.css'],
  providers: [NgbAccordionConfig]
})
export class PatientTableauComponent implements OnInit {
  compte : Compte;
  patient : Compte;

  NouvelleMigraine : Migraine = new Migraine();
  MigraineAffichage : Migraine;
  AffichageNouvelleMigraine : boolean = false;
  AffichageModificationMigraine : boolean = false;
  // dateDebut: NgbDateStruct;
  // dateFin: NgbDateStruct;

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
  }

  ModifierMigraine(Migraine)
  {
    this.NouvelleMigraine = Migraine;
    //this.dateDebut = this.NouvelleMigraine.DateDebut;
    this.AffichageNouvelleMigraine = false;
    this.AffichageModificationMigraine = true;
  }

  ChoixBinaire(facteur : Facteur, valeur : number)
  {
    facteur.Selection = true;
    facteur.Reponse = valeur;
    console.log(this.compte.MesFacteurs);
  }

  ChoixAnalogique(facteur : Facteur, valeur : number)
  {
    facteur.Selection = true;
    facteur.Reponse = valeur;
  }

  changeTimeDebut(searchValue : string)
  {
    console.log('debut', searchValue);
    console.log('DateDebut', this.NouvelleMigraine.DateDebut);
    this.NouvelleMigraine.HeureDebut = {hour : parseInt(searchValue.split(':')[0]), minute : parseInt(searchValue.split(':')[1]), second : 0};
    
    this.NouvelleMigraine.Debut = this.NouvelleMigraine.DateDebut.year + "-" + this.NouvelleMigraine.DateDebut.month + "-" + this.NouvelleMigraine.DateDebut.day + "T" + searchValue;
    console.log('time debut', this.NouvelleMigraine);
  }
  // changeTimeFin(searchValue : DateTimeFormat)
  changeTimeFin(searchValue : string)
  {
    console.log('fin', searchValue);
    this.NouvelleMigraine.HeureFin = {hour : parseInt(searchValue.split(':')[0]), minute : parseInt(searchValue.split(':')[1]), second : 0};
    this.NouvelleMigraine.Fin = this.NouvelleMigraine.DateFin.year + "-" + this.NouvelleMigraine.DateFin.month + "-" + this.NouvelleMigraine.DateFin.day + "T" + searchValue;
    console.log('time fin', this.NouvelleMigraine);
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
    this.compte.MesMedicaments.forEach(medicament => 
    {
      if (medicament.Selection)
      {
        let nouveauMedicament : Medicament = new Medicament();
        nouveauMedicament.ID = medicament.ID;
        nouveauMedicament.Quantite = 1;
        this.NouvelleMigraine.MedicamentsPris.push(nouveauMedicament);
      }
    });
    this.compte.MesFacteurs.forEach(facteur => 
    {
      if (facteur.Selection)
      {
        let nouveauFacteur : Facteur = new Facteur();
        nouveauFacteur.ID = facteur.ID;
        nouveauFacteur.Reponse = facteur.Reponse;
        this.NouvelleMigraine.Facteurs.push(nouveauFacteur);
      }
    });
    
    console.log(this.NouvelleMigraine);
    console.log('mes MedicamentsPris : ',this.NouvelleMigraine.MedicamentsPris);
    console.log('mes Facteurs : ',this.NouvelleMigraine.Facteurs);

    var patientEnvois : Compte = new Compte();
    patientEnvois.IDWeb = this.patient.IDWeb;
    patientEnvois.MesMigraines = [];
    patientEnvois.MesMigraines.push(this.NouvelleMigraine);

    this.patientService.compte = patientEnvois;
    console.log('nouvelle  Migraine', this.NouvelleMigraine);
    console.log('patient contenant la nouvelle migraine', patientEnvois);

    this.patientService.AjouterMigraineAPatient().subscribe(data => 
    {
      this.patient = data.body as Compte;
    });
  }

  Information(migraine : Migraine)
  {
    this.MigraineAffichage = migraine;
  }

  Annule()
  {
    this.AffichageNouvelleMigraine = false;
    this.AffichageModificationMigraine = false;
    this.NouvelleMigraine = new Migraine();
  }

  // Date(migraine : Migraine) : string
  // { 
  //   let retour : string = "";
  //   retour = migraine..day + InformationDate.month
  //   return InformaitonDate.substring(0, InformaitonDate.indexOf('T'));
  // }
  // Heure(migraine : Migraine) : string
  // {
  //   return InformaitonDate.substring(InformaitonDate.indexOf('T') + 1, InformaitonDate.length);
  // }
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
