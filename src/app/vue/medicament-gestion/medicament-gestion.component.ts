import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Observable';


import { MedicamentService } from './../../service/medicament/medicament.service';
import { CompteService } from './../../service/compte/compte.service';
import { PatientService } from './../../service/patient/patient.service';


import { Medicament } from './../../model/medicament';
import { Compte } from './../../model/compte';
import { Patient } from './../../model/patient';
import { Alert } from 'selenium-webdriver';

// declare var jquery:any;
// declare var $ :any;

@Component({
  selector: 'app-medicament-gestion',
  templateUrl: './medicament-gestion.component.html',
  styleUrls: ['./medicament-gestion.component.css']
})
export class MedicamentGestionComponent implements OnInit {

  //title = 'abgular 4 with jquery';

  compte : Compte;
  patient : Compte;
  MedicamentRecherche : string;
  ListMedicaments : Medicament[] = [];
  MedicamentAffichage : Medicament;
  MedicamentSelectionne : Medicament;
  dataSource = new MatTableDataSource<Medicament>(this.ListMedicaments);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns = ['Denomination', 'Ajouter'];

  constructor(
    private medicamentService : MedicamentService,
    private compteService : CompteService,
    private patientService : PatientService,
    private router:Router) { }

  ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    this.patientService.patient.subscribe(res => this.patient = res);
    if (this.compte.IDWeb == 0) this.router.navigate(['prospec']);
    console.log('Le patient (medicaments-gestion) : ', this.patient);
    //this.medicamentService.Entravail = false;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  Information(medicament : Medicament) : void
  {
    this.MedicamentAffichage = medicament;
    // console.log(medicament);
    //  $( document ).Alert("test");
    // $( function() {
    //   $( document ).tooltip();
    // } );
  
  }
  //a la sélection on créé un compte contenant l'identifiant et le tocken. on lui ajoute le patient sélectionné et dans ce patient le médicament sélectionné
  onselect(medicament : Medicament) : void
  {
    this.patientService.changePatient(this.patient);

    let compteEnvois : Compte = new Compte();
    compteEnvois.IDWeb = this.compte.IDWeb;
    compteEnvois.Token = this.compte.Token;
    compteEnvois.MesPatients = [];

    let patientEnvois : Compte = new Compte();
    patientEnvois.IDWeb = this.patient.IDWeb;
    patientEnvois.MesMedicaments = [];

    let medicamentEnvois : Medicament = new Medicament();
    medicamentEnvois.ID = medicament.ID;

    patientEnvois.MesMedicaments.push(medicamentEnvois);
    compteEnvois.MesPatients.push(patientEnvois);

    this.patientService.compte = compteEnvois;

    this.patientService.AjoutMedicamentAPatient().subscribe(data => {
      console.log(data.body);
      this.patient = data.body;
      this.patient.TableMedicament = new MatTableDataSource<Medicament>(this.patient.MesMedicaments);
      this.patientService.changePatient(this.patient);
    });
  }
  
  rechercheMedicament() {
    console.log(this.medicamentService.Entravail);
    //if (this.MedicamentRecherche.length > 4 && this.medicamentService.Entravail == false)
    if (this.MedicamentRecherche.length > 4)
    {
      this.medicamentService.Entravail = true;
      console.log('le nom a chercher est : ',this.MedicamentRecherche);
      let medicament : Medicament = new Medicament();
      medicament.DenominationMedicament = this.MedicamentRecherche;

      let compteEnvois : Compte = new Compte();
      compteEnvois.IDWeb = this.compte.IDWeb;
      compteEnvois.Token = this.compte.Token;
      compteEnvois.MesMedicaments = [];
      compteEnvois.MesMedicaments.push(medicament);
      this.medicamentService.compte = compteEnvois;
      console.log('le compte a envoyer est : ', compteEnvois);
      this.medicamentService.GetMedicament().subscribe(data => {
        this.medicamentService.Entravail = false;
        console.log(data.body);
        this.ListMedicaments = (data.body as Medicament[]);

        this.dataSource = new MatTableDataSource<Medicament>(this.ListMedicaments);
        this.dataSource.paginator = this.paginator;
      });
    }
    else if (this.ListMedicaments.length > 0) this.ListMedicaments = [];
  }
}
