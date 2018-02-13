import { Component, OnInit, Input, Inject } from '@angular/core';

import { PatientService } from './../../service/patient/patient.service';

import { Compte } from './../../model/compte';

@Component({
  selector: 'app-patient-information',
  templateUrl: './patient-information.component.html',
  styleUrls: ['./patient-information.component.css']
})
export class PatientInformationComponent implements OnInit {

  patient : Compte;
  constructor(private patientService : PatientService) { }

  ngOnInit() {
    this.patientService.patient.subscribe(res => this.patient = res);
    console.log('le patient a l\'affichage', this.patient);
  }

}
