import { Component, OnInit } from '@angular/core';
import {NgbTimeStruct ,NgbDateStruct, NgbDateAdapter, NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';

import { PatientService } from './../../service/patient/patient.service'
import { Compte } from '../../model/compte';
import { CompteService } from '../../service/compte/compte.service';
import { Migraine } from '../../model/migraine';
import { Medicament } from '../../model/medicament';
import { Facteur } from '../../model/facteur';
import { Synthese } from '../../model/synthese';


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

  constructor(
      private config: NgbAccordionConfig,
      private patientService:PatientService,
      private compteService:CompteService,
      private router:Router) {
    config.closeOthers = false;
    config.type = 'info';
   }

  
  ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    if (this.compte.IDWeb > 0)
      {
      this.patientService.patient.subscribe(res => this.patient = res);
      console.log('le compte : ',this.compte);
      console.log('le patient : ',this.patient);
      this.NouvelleMigraine.MedicamentsPris = [];
      this.NouvelleMigraine.Facteurs = [];
      this.patient.MesMedicaments.forEach(medicament => {medicament.Selection = false;});
      this.patient.MesFacteurs.forEach(facteur => {facteur.Selection = false;});
    }
  }



  ChoixBinaire(facteur : Facteur, valeur : number)
  {
    facteur.Selection = true;
    facteur.Reponse = valeur;
    console.log('mes facteurs',this.compte.MesFacteurs);
  }

  ChoixAnalogique(facteur : Facteur, valeur : number)
  {
    facteur.Selection = true;
    facteur.Reponse = valeur;
  }

  timedebut : string;
  changeTimeDebut(searchValue : string)
  {
    console.log('debut', searchValue);
    console.log('DateDebut', this.NouvelleMigraine.DateDebut);
    this.NouvelleMigraine.HeureDebut = {hour : parseInt(searchValue.split(':')[0]), minute : parseInt(searchValue.split(':')[1]), second : 0};
    
    this.NouvelleMigraine.Debut = this.NouvelleMigraine.DateDebut.year + "-" + this.NouvelleMigraine.DateDebut.month + "-" + this.NouvelleMigraine.DateDebut.day + "T" + searchValue;
    //this.NouvelleMigraine.Debut = this.NouvelleMigraine.DateDebut + "T" + searchValue;
    console.log('time debut', this.NouvelleMigraine);
  }
  timefin : string;
  changeTimeFin(searchValue : string)
  {
    console.log('fin', searchValue);
    this.NouvelleMigraine.HeureFin = {hour : parseInt(searchValue.split(':')[0]), minute : parseInt(searchValue.split(':')[1]), second : 0};
    this.NouvelleMigraine.Fin = this.NouvelleMigraine.DateFin.year + "-" + this.NouvelleMigraine.DateFin.month + "-" + this.NouvelleMigraine.DateFin.day + "T" + searchValue;
    //this.NouvelleMigraine.Fin = this.NouvelleMigraine.DateFin + "T" + searchValue;
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

  //lancement de l'affichage d'une nouvelle migraine. on en profite pour nettoyer les informations de migranine et de facteurs
  AjoutMigraine()
  {
    //si on a déjà cliqué sur nouvelle migraine
    if (this.AffichageNouvelleMigraine) {
      this.AffichageNouvelleMigraine = false;
    }
    else {
    this.AffichageNouvelleMigraine = true;
    this.NouvelleMigraine = new Migraine();
    this.NouvelleMigraine.Intensite = "1";

    this.patient.MesMedicaments.forEach(medicament => {medicament.Selection = false});

    this.patient.MesFacteurs.forEach(facteur => 
      {
        facteur.Selection = false;
        //facteur.Reponse = 0;
      });
    }
  }

  //on envois en webservice la nouvelle migraine ou la migraine modifié
  ValidationMigraine()
  {
    let MigraineAEnvoyer = new Migraine();
    MigraineAEnvoyer.MedicamentsPris = [];
    MigraineAEnvoyer.Facteurs = [];

    MigraineAEnvoyer.Intensite = this.NouvelleMigraine.Intensite;
    MigraineAEnvoyer.DateDebut = this.NouvelleMigraine.DateDebut;
    MigraineAEnvoyer.DateFin = this.NouvelleMigraine.DateFin;
    MigraineAEnvoyer.HeureDebut = this.NouvelleMigraine.HeureDebut;
    MigraineAEnvoyer.Debut = this.NouvelleMigraine.Debut;
    MigraineAEnvoyer.HeureFin = this.NouvelleMigraine.HeureFin;
    MigraineAEnvoyer.Fin = this.NouvelleMigraine.Fin;

    MigraineAEnvoyer.ID = this.NouvelleMigraine.ID;
    MigraineAEnvoyer.Complet = true;


    this.patient.MesMedicaments.forEach(medicament => 
    {
      if (medicament.Selection)
      {
        let nouveauMedicament : Medicament = new Medicament();
        nouveauMedicament.ID = medicament.ID;
        nouveauMedicament.Quantite = 1;
        MigraineAEnvoyer.MedicamentsPris.push(nouveauMedicament);
      }
    });
    this.patient.MesFacteurs.forEach(facteur => 
    {
      if (facteur.Selection)
      {
        let nouveauFacteur : Facteur = new Facteur();
        nouveauFacteur.ID = facteur.ID;
        nouveauFacteur.Reponse = facteur.Reponse;
        MigraineAEnvoyer.Facteurs.push(nouveauFacteur);
      }
    });
    
    
    console.log('mes MedicamentsPris : ',MigraineAEnvoyer.MedicamentsPris);
    console.log('mes Facteurs : ',MigraineAEnvoyer.Facteurs);

    var patientEnvois : Compte = new Compte();
    patientEnvois.IDWeb = this.patient.IDWeb;
    patientEnvois.MesMigraines = [];
    patientEnvois.MesMigraines.push(MigraineAEnvoyer);

    this.patientService.compte = patientEnvois;
    // console.log('nouvelle  Migraine', MigraineAEnvoyer);
    // console.log('patient contenant la nouvelle migraine', patientEnvois);
    console.log('le patient avant modification', this.patient);
    this.patientService.AjouterMigraineAPatient().subscribe(data => 
    {
      this.AffichageNouvelleMigraine = false;
      this.AffichageModificationMigraine = false;
      this.patient = data.body as Compte;
      console.log('le patient au retour de modification', this.patient);
      this.patient = this.patientService.Actualisation(this.patient); //on actualise les courbes
      this.patientService.changePatient(this.patient);
    });
  }


  //affichage de la migraine que l'on souhaite modifier
  ModifierMigraine(Migraine)
  {   
    this.patient.MesMedicaments.forEach(medicament => {medicament.Selection = false});
    this.patient.MesFacteurs.forEach(facteur => 
      {
        facteur.Selection = false;
      });
    this.NouvelleMigraine = Migraine;

    var heure : string = "";
    var minute : string = "";

    if (this.NouvelleMigraine.HeureDebut.hour < 10) heure = "0" + this.NouvelleMigraine.HeureDebut.hour.toString();
    else heure = this.NouvelleMigraine.HeureDebut.hour.toString();
    if (this.NouvelleMigraine.HeureDebut.minute < 10 ) minute = "0" + this.NouvelleMigraine.HeureDebut.minute.toString();
    else  minute = "0" + this.NouvelleMigraine.HeureDebut.minute.toString();
    this.timedebut = heure + ":" + minute;

    if (this.NouvelleMigraine.HeureFin.hour < 10) heure = "0" + this.NouvelleMigraine.HeureFin.hour.toString();
    else heure = this.NouvelleMigraine.HeureFin.hour.toString();
    if (this.NouvelleMigraine.HeureFin.minute < 10 ) minute = "0" + this.NouvelleMigraine.HeureFin.minute.toString();
    else  minute = "0" + this.NouvelleMigraine.HeureFin.minute.toString();
    this.timefin = heure + ":" + minute;

    console.log('le patient : ', this.patient);
    console.log('Migraine en modification', this.NouvelleMigraine);

    //on ajoute pour chaque médicament de la liste des médicaments la valeur sélection = vrais dans le cas ou le médicament existe dans la liste des médicament pris de la migraine sélectionné
    if (this.NouvelleMigraine.MedicamentsPris){
      this.NouvelleMigraine.MedicamentsPris.forEach(medicamentpris => {
        let medicament = this.patient.MesMedicaments.find(medicament => medicament.ID == medicamentpris.ID);
        if (medicament) medicament.Selection = true;
      });
    }

    //pour chacun de mes facteurs on regarde s'il se trouve aussi dans les facteurs de la migraine si oui on entre les valeurs dans les champs si non on le définit en undefined
    if (this.NouvelleMigraine.Facteurs){
      this.patient.MesFacteurs.forEach(facteur => {
        
          let facteurTrouve = this.NouvelleMigraine.Facteurs.find( facteurpris => facteur.ID == facteurpris.ID);
          
          if (facteurTrouve)  {
            facteur.Reponse = facteurTrouve.Reponse;
            facteur.Selection = true;
          } else {
            if (facteur.TypeDeReponse.ID == 2 ) {     //S'il s'agit d'un facteur binaire
              facteur.Reponse = undefined;
              facteur.Selection = false;
            }
            else {
              facteur.Reponse = 0;
              facteur.Selection = false;
            }
          }
        
      });
      console.log('les facteurs du patient après sélection pour modificiation ', this.patient.MesFacteurs);
    }

    console.log('mes médicaments', this.patient.MesMedicaments);

    this.AffichageNouvelleMigraine = false;
    this.AffichageModificationMigraine = true;
  }

  SupprimerMigraine(migraine : Migraine){
    this.AffichageNouvelleMigraine = false;
    this.AffichageModificationMigraine = false;
    var patientEnvois : Compte = new Compte();
    patientEnvois.IDWeb = this.patient.IDWeb;
    patientEnvois.MesMigraines = [];

    let MigraineASupprimer : Migraine = new Migraine();
    MigraineASupprimer.ID = migraine.ID;
    patientEnvois.MesMigraines.push(MigraineASupprimer);
    this.patientService.compte = patientEnvois;
    this.patientService.SupprimerMigraineAPatient().subscribe(data => 
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
