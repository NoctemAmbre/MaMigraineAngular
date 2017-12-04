import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpErrorResponse} from '@angular/common/http'
import { PatientService } from './../../service/patient/patient.service';

import { Compte } from './../../model/compte';

@Component({
  selector: 'app-patient-ordonnance',
  templateUrl: './patient-ordonnance.component.html',
  styleUrls: ['./patient-ordonnance.component.css']
})
export class PatientOrdonnanceComponent implements OnInit {
  
  patient : Compte;
  constructor(private patientService : PatientService) { }

  ngOnInit() {
    this.patientService.patient.subscribe(res => {this.patient = res});
    console.log('Le patient (ordonnance) : ', this.patient);
  }
}
