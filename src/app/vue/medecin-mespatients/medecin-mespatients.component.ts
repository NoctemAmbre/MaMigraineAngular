import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { CompteService } from './../../service/compte/compte.service';
import { PatientService } from './../../service/patient/patient.service';

declare var jquery:any;
declare var $ :any;

//import { PopupComponent } from './../../vue/popup/popup.component';

import { Compte } from './../../model/compte';
import { Synthese } from '../../model/synthese';

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
  ListPatient : Compte[] = [];
  dataSource = new MatTableDataSource<Compte>();
  Selection : boolean = false;
  Tabulation : number = 0;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private compteService : CompteService,
              private patientService : PatientService,
              private router:Router
              ) { }

  ngAfterViewInit() {
    this.compteService.compte.subscribe(resc => this.compte = resc);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns = ['Nom', 'Prénom', 'AdresseMail', 'Supprimer'];
  //displayedColumns = ['Nom', 'Prénom'];

  ngOnInit() {
    this.patientService.patient.subscribe(resp => {this.patient = resp; console.log('le patient visible',resp);});
    this.compteService.compte.subscribe(resc => this.compte = resc);
   
    //this.dataSource = new MatTableDataSource<Compte>(this.compte.MesPatients);
    
    if (this.compte.IDWeb == 0) this.router.navigate(['prospec']);
    // if (this.compte.Officiel == false) this.router.navigate(['prospec']);
    //this.patientService.changePatient(this.patient);
    this.compteService.changeCompte(this.compte);
    console.log('compte', this.compte);
  }

  cacher(){
    this.compte.Erreur = "";
  }

  InfoOuordonnance(Select : boolean)
  {
    this.Selection = Select;
  }
  openInfoPatient(evt:any, Name:string)
  {
  $(function openInfoPatient(evt, Name) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(Name).style.display = "block";
      evt.currentTarget.className += " active";
    });
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
        this.patientService.Entravail = false;
        console.log('retour', data.body);
        this.compteService.changeCompte(this.compte);
    });
  }

  ValiderNouveauPatient(Patient : Compte){
    this.ListPatient = null;
    this.compte.MesPatients = [];
    this.compte.MesPatients.push(Patient);
    console.log('Mes patient à valider', this.compte);
    this.compteService.changeCompte(this.compte);
    this.compteService.ValidationPatient().subscribe(data => {
       this.compte = data.body;
       this.patientService.Entravail = false;
       console.log('retour', data.body);
       this.compteService.changeCompte(this.compte);
   });
  }

  SupprPatient(compteASupprimer : Compte) : void
  {
      console.log('suppression du patient ' + compteASupprimer);
     this.ListPatient = null;
     this.compte.MesPatients = [];
     this.compte.MesPatients.push(compteASupprimer);
     console.log('patient à supprimer', this.compte.MesPatients[0]);
     this.compteService.changeCompte(this.compte);
     this.compteService.SuppressionPatient().subscribe(data => {
        this.compte = data.body;
        this.patientService.Entravail = false;
        console.log('retour', data.body);
        this.compteService.changeCompte(this.compte);
    });
  }

  //on envois le compte Medecin avec un seul "MesPatient" celui sélectionné
  selectAffichage(PatientAAfficher : Compte) : void
  {
    //this.patient = compteAAfficher;
    this.patientService.compte = PatientAAfficher;
    // let CompteAEnvoyer : Compte = new Compte();
    // CompteAEnvoyer.IDWeb = this.compte.IDWeb;
    // CompteAEnvoyer.Token = this.compte.Token;
    // CompteAEnvoyer.MesPatients = [];
    // CompteAEnvoyer.MesPatients.push(this.patient);
    
    //  this.patient = compteAAfficher;
    //  this.patientService.compte = CompteAEnvoyer;
     this.patientService.InformationPatient().subscribe(data => {
       console.log('le patient pour info courbe',this.patient);
        let Typeligne : string;
        if (this.patient.synthese == null){
          Typeligne = "line";

        }
        else {
          // console.log('le type de ligne', this.patient.synthese.lineChartType);
          Typeligne = this.patient.synthese[0].lineChartType;
          // console.log('le type de ligne', Typeligne);
        }

        this.patient = data.body;

        //mise a jours de la courbe
        this.patient.synthese = [];
        this.patient.synthese.push(new Synthese());
        this.patient.synthese.push(new Synthese());
        this.patient.synthese.push(new Synthese());

        this.patient.synthese[0].lineChartType = Typeligne;
        // this.patient.synthese.courbe1 = courbe1;
        // this.patient.synthese.courbe2 = courbe2;
        // this.patient.synthese.courbe3 = courbe3;
        this.patient.synthese[0].ActualisationCourbe(this.patient, 0);
        this.patient.synthese[1].ActualisationCourbe(this.patient, 1);
        this.patient.synthese[2].ActualisationCourbe(this.patient, 2);

        //console.log('le nombre de moi',this.patient.synthese.lineChartLabels.length);
        //console.log('le nombre de moi',this.patient.synthese.lineChartData[0].data.length);
        //console.log('le nombre de moi',this.patient.synthese.lineChartData[0].length);

        this.patientService.changePatient(this.patient);
        console.log('Patient Sélectionné', this.patient);
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
          this.dataSource = new MatTableDataSource<Compte>(this.ListPatient);
          this.patientService.Entravail = false;
          console.log('retour', data.body);
          if (data.body.length > 0) {   
            console.log(data.body);
          }
      });
    }
  }

}
