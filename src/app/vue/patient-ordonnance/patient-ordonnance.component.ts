import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpErrorResponse} from '@angular/common/http'
import { PatientService } from './../../service/patient/patient.service';
import { CompteService } from './../../service/compte/compte.service';

import { Compte } from './../../model/compte';
import { Medicament } from './../../model/medicament';

@Component({
  selector: 'app-patient-ordonnance',
  templateUrl: './patient-ordonnance.component.html',
  styleUrls: ['./patient-ordonnance.component.css']
})
export class PatientOrdonnanceComponent implements OnInit {
  
  MedicamentAffichage : Medicament;
  

  compte : Compte;
  patient : Compte;
  medicamentEnvois : Medicament = new Medicament();
  constructor(private patientService : PatientService, private compteService : CompteService) { }

  ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    this.patientService.patient.subscribe(res => this.patient = res);
    //console.log('Le patient (ordonnance) : ', this.patient);
  }

  Information(medicament : Medicament) : void
  {
    this.MedicamentAffichage = medicament; 
  }

  Supprimer(Medicament: Medicament) : void
  {
    this.patientService.changePatient(this.patient);
    
    let compteEnvois : Compte = new Compte();
    compteEnvois.IDWeb = this.compte.IDWeb;
    compteEnvois.Token = this.compte.Token;
    compteEnvois.MesPatients = [];

    let patientEnvois : Compte = new Compte();
    patientEnvois.IDWeb = this.patient.IDWeb;
    patientEnvois.MesMedicaments = [];

    this.medicamentEnvois.ID = Medicament.ID;

    patientEnvois.MesMedicaments.push(this.medicamentEnvois);
    compteEnvois.MesPatients.push(patientEnvois);

    this.patientService.compte = compteEnvois;

    this.patientService.SupprimerMedicamentAPatient().subscribe(data => {
      console.log(data.body);
      this.patient = data.body;
      this.patientService.changePatient(this.patient);
    });
  }
}
