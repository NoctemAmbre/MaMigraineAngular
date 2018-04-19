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
      this.patient.synthese = [];
      this.patient.synthese.push(new Synthese());
      this.patient.synthese.push(new Synthese());
      this.patient.synthese.push(new Synthese());
    }

    this.patient.synthese[0].ActualisationCourbe(this.patient, 0);
    this.patient.synthese[1].ActualisationCourbe(this.patient, 1);
    this.patient.synthese[2].ActualisationCourbe(this.patient, 2);

    this.patientService.changePatient(this.patient);
  }

  Actualisation(typegraph : string){
    this.patient.synthese = [];
    this.patient.synthese.push(new Synthese());
    this.patient.synthese.push(new Synthese());
    this.patient.synthese.push(new Synthese());

    this.patient.synthese[0].lineChartType = typegraph;
    this.patient.synthese[1].lineChartType = typegraph;
    this.patient.synthese[2].lineChartType = typegraph;

    this.patient.synthese[0].ActualisationCourbe(this.patient, 0);
    this.patient.synthese[1].ActualisationCourbe(this.patient, 1);
    this.patient.synthese[2].ActualisationCourbe(this.patient, 2);

    // this.patient.synthese[0].lineChartData[0] = this.patient.synthese[0].NombreMensuel(this.patient);
    // this.patient.synthese[1].lineChartData[1] = this.patient.synthese[1].intensiteMoyenMensuel(this.patient);
    // this.patient.synthese[2].lineChartData[2] = this.patient.synthese[2].TempMoyen(this.patient);
    this.patientService.changePatient(this.patient);
  }
}
