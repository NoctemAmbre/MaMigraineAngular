import { Component, OnInit } from '@angular/core';

import { CompteService } from './../../service/compte/compte.service'
import { PatientService } from './../../service/patient/patient.service'
import { SyntheseService } from './../../service/synthese/synthese.service';
import { Compte } from '../../model/compte';
import { Synthese, Valeur } from '../../model/synthese';
import { Migraine } from '../../model/migraine';
import { Alert } from 'selenium-webdriver';
import { forEach } from '@angular/router/src/utils/collection';
import { Patient } from '../../model/patient';

@Component({
  selector: 'app-patient-courbes',
  templateUrl: './patient-courbes.component.html',
  styleUrls: ['./patient-courbes.component.css']
})
export class PatientCourbesComponent implements OnInit {
  patient : Compte;
  compte : Compte;
  
  constructor(private compteService:CompteService, private patientService:PatientService, private syntheseService : SyntheseService) { }

  ngOnInit() {
    
    this.compteService.compte.subscribe(res => this.compte = res);
    this.patientService.patient.subscribe(res => this.patient = res);
    
    
    if (this.compte.IDWeb == this.patient.IDWeb) {this.patient = this.compte;}
    if (this.patient.synthese == null){ 
      this.patient.synthese = new Synthese();
      // this.patient.synthese.courbe1 = true;
      // this.patient.synthese.courbe2 = false;
      // this.patient.synthese.courbe3 = false;
    }
    this.patient.synthese.ActualisationCourbe(this.patient);
    this.patientService.changePatient(this.patient);
  }

  Actualisation(typegraph : string){
    this.patient.synthese = new Synthese();
    this.patient.synthese.lineChartType = typegraph;
    this.patient.synthese.ActualisationCourbe(this.patient);
    this.patientService.changePatient(this.patient);
  }
}
