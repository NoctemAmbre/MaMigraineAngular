import { Component, OnInit, Input, Inject, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PatientService } from './../../service/patient/patient.service';
import { Compte } from '../../model/compte';

@Component({
  selector: 'app-patient-mesmigraines',
  templateUrl: './patient-mesmigraines.component.html',
  styleUrls: ['./patient-mesmigraines.component.css']
})
export class PatientMesmigrainesComponent implements OnInit {
  patient : Compte;
  constructor(private patientService:PatientService) { }

  ngOnInit() {
    this.patientService.patient.subscribe(res => this.patient = res);
    //this.patientService.changePatient(this.patient);
    
  }

}
