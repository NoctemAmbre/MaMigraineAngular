import { Component, OnInit } from '@angular/core';
import { PatientService } from './../../service/patient/patient.service'
import { Compte } from '../../model/compte';

@Component({
  selector: 'app-patient-tableau',
  templateUrl: './patient-tableau.component.html',
  styleUrls: ['./patient-tableau.component.css']
})
export class PatientTableauComponent implements OnInit {
  patient : Compte;
  constructor(private patientService:PatientService) { }

  
  ngOnInit() {
    this.patientService.patient.subscribe(res => this.patient = res);
  }

}
