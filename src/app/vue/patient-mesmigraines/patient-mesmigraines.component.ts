import { Component, OnInit, Input, Inject, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PatientService } from './../../service/patient/patient.service';
import { CompteService } from './../../service/compte/compte.service';
import { Compte } from '../../model/compte';

@Component({
  selector: 'app-patient-mesmigraines',
  templateUrl: './patient-mesmigraines.component.html',
  styleUrls: ['./patient-mesmigraines.component.css']
})
export class PatientMesmigrainesComponent implements OnInit {
  patient : Compte;
  compte : Compte;
  constructor(private compteService:CompteService,
     private patientService:PatientService,
     private router:Router) { }

  ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    this.patientService.patient.subscribe(res => this.patient = res);
    if (this.compte.IDWeb == 0) this.router.navigate(['prospec']);

    console.log('compte : ',this.compte);
    console.log('patient: ',this.patient);
    if (this.patient.IDWeb == 0)
    {
      this.patient = this.compte;
      this.patientService.changePatient(this.patient);
    }

  }

}
