import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PatientService } from './../../service/patient/patient.service';
//import { PatientsRetour } from './../metier/patient';
import { Patient } from './../../model/patient';


@Component({
  selector: 'app-liste-patients',
  templateUrl: './liste-patients.component.html',
  styleUrls: ['./liste-patients.component.css'],
  providers : [PatientService]
})
export class ListePatientsComponent implements OnInit {
  //ListPatient : PatientsRetour;
  //patients : Map<number,Patient>;
  patients : Patient[];

  patientSelection : Patient;

  constructor(private patientservice : PatientService) {
      //this.patients = this.patientservice.ListePatients();
      //this.teststring = this.patientservice.ListePatients2();
      console.log(this.patients);
    }
  ngOnInit() {  }
  onselect(patient : Patient) : void
  {
    this.patientSelection = patient;
  }
}
