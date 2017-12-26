import { Component, OnInit, Input } from '@angular/core';

import { PatientService } from './../../service/patient/patient.service'

import { Compte } from '../../model/compte';
import { Facteur } from '../../model/facteur';

@Component({
  selector: 'app-patient-facteurs',
  templateUrl: './patient-facteurs.component.html',
  styleUrls: ['./patient-facteurs.component.css']
})
export class PatientFacteursComponent implements OnInit {

  constructor(private patientService:PatientService) { }
  // @Input() Favorable : boolean;
  patient : Compte;
  ListeFacteurs : Facteur[] = [];
  FacteurSelect : Facteur;

  ngOnInit() {
    this.patientService.patient.subscribe(res => this.patient = res);
    //this.ListeFacteurs = this.patient.MesFacteurs.filter(elt => elt.Type == this.Favorable);
    //if (this.Favorable) console.log("vrais");
  }

  Information(facteur:Facteur)
  {
    this.FacteurSelect = facteur;
  }

  //dans un nouveau patient a l'id du patient choisit on envois dans un nouveau facteur l'id du facteur sélectionné
  Supprimer(facteur:Facteur)
  {
    let PatientEnvois : Compte = new Compte();
    PatientEnvois.IDWeb = this.patient.IDWeb;
    PatientEnvois.MesFacteurs = [];

    let FacteurEnvois : Facteur = new Facteur();
    FacteurEnvois.ID = facteur.ID;
    PatientEnvois.MesFacteurs.push(FacteurEnvois);
    this.patientService.compte = PatientEnvois;
    this.patientService.SupprimerFacteurAPatient().subscribe(data => {
      this.patient = data.body as Compte;
      this.patientService.changePatient(this.patient);
    });
  }
}
