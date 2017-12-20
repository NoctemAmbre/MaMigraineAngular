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
  @Input() Favorable : boolean;
  patient : Compte;
  ListeFacteurs : Facteur[] = [];
  FacteurSelect : Facteur;


  ngOnInit() {
    this.patientService.patient.subscribe(res => this.patient = res);
    this.ListeFacteurs = this.patient.MesFacteurs.filter(elt => elt.Type == this.Favorable);
    if (this.Favorable) console.log("vrais");
  }

  Information(facteur:Facteur)
  {
    this.FacteurSelect = facteur;
  }
}
