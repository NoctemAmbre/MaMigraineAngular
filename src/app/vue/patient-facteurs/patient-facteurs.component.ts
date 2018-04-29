import { Component, OnInit, Input } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CompteService } from './../../service/compte/compte.service';
import { PatientService } from './../../service/patient/patient.service'

import { Compte } from '../../model/compte';
import { Facteur } from '../../model/facteur';

@Component({
  selector: 'app-patient-facteurs',
  templateUrl: './patient-facteurs.component.html',
  styleUrls: ['./patient-facteurs.component.css']
})
export class PatientFacteursComponent implements OnInit {

  constructor(
    private compteService:CompteService,
    private patientService:PatientService,
    private router:Router) { }
  // @Input() Favorable : boolean;
  patient : Compte;
  compte : Compte;
  //ListeFacteurs : Facteur[] = [];
  FacteurSelect : Facteur;
  //dataSource = new MatTableDataSource<Facteur>();

  displayedColumns = ['Nom', 'Question', 'Supprimer'];

  ngAfterViewInit() {
    // this.compteService.compte.subscribe(res => this.compte = res);
    // this.patientService.patient.subscribe(res => this.patient = res);
    // if (this.patient.IDWeb == 0) { //si cette page est lancé directement par un patient alors on transfer le compte dans patient
    //   this.patient = this.compte;
    //   this.patient.TableFacteur = new MatTableDataSource<Facteur>(this.patient.MesFacteurs);
    // }
    console.log('le compte dans ngAfterViewInit',this.compte);
    console.log('le patient dans ngAfterViewInit',this.patient);
    console.log('la table des du patient', this.patient.TableFacteur);

  }

  ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    this.patientService.patient.subscribe(res => this.patient = res);
    if (this.compte.IDWeb == 0) this.router.navigate(['prospec']);
    if (this.compte.Type == 2){ //si cette page est lancé directement par un patient 
      //this.compte.TableFacteur = new MatTableDataSource<Facteur>(this.compte.MesFacteurs);
      this.patient = this.compte;
    }
    console.log('le compte dans ngOnInit',this.compte);
    console.log('le patient dans ngOnInit',this.patient);
    console.log('la table des du patient', this.patient.TableFacteur);
    // console.log('ngOnInit : je suis le premier ? ');
    
    //this.ListeFacteurs = this.patient.MesFacteurs.filter(elt => elt.Type == this.Favorable);
    //if (this.Favorable) console.log("vrais");
  }

  Information(facteur:Facteur)
  {
    //console.log('facteur sélectionné', facteur);
    this.FacteurSelect = facteur;
  }

  //dans un nouveau patient a l'id du patient choisit on envois dans un nouveau facteur l'id du facteur sélectionné
  Supprimer(facteur:Facteur)
  {
    let PatientEnvois : Compte = new Compte();
    PatientEnvois.IDWeb = this.patient.IDWeb;
    PatientEnvois.MesFacteurs = [];

    let FacteurEnvois : Facteur = new Facteur();
    FacteurEnvois.ID = facteur.ID;
    PatientEnvois.MesFacteurs.push(FacteurEnvois);
    this.patientService.compte = PatientEnvois;
    this.patientService.SupprimerFacteurAPatient().subscribe(data => {
      this.patient = data.body as Compte;
      this.patient.TableFacteur = new MatTableDataSource<Facteur>(this.patient.MesFacteurs);
      this.patientService.changePatient(this.patient);
    });
  }
}
