import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { Compte } from './../../model/compte';

import { CompteService } from './../../service/compte/compte.service';
import { AdministrateurService } from './../../service/administrateur/administrateur.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-administrateur-listmedecin',
  templateUrl: './administrateur-listmedecin.component.html',
  styleUrls: ['./administrateur-listmedecin.component.css']
})
export class AdministrateurListmedecinComponent implements OnInit {

  compte : Compte;
  Listcompte : Compte[];
  dataSource = new MatTableDataSource<Compte>(this.Listcompte);
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.Lecture();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns = ['Nom', 'Prénom', 'Identifiant', 'Supprimer', 'Valider'];

  constructor(
    private compteService : CompteService,
    private administrateurService : AdministrateurService,
    private router:Router) { }

  ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    if (this.compte.IDWeb == 0) this.router.navigate(['prospec']); 
    if (this.compte == null) this.router.navigate(['prospec']); 
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  Lecture(){
    let CompteEnvois : Compte = new Compte();
    CompteEnvois.IDWeb = this.compte.IDWeb;

    this.administrateurService.compte = CompteEnvois;
    this.administrateurService.ListMedecin().subscribe(data => {
      this.Listcompte = data;
      //console.log('retour requête', data)
      this.dataSource = new MatTableDataSource<Compte>(this.Listcompte);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    });
  }

  Valider(compte : Compte){
    let CompteEnvois : Compte = new Compte();
    CompteEnvois.IDWeb = this.compte.IDWeb;
    CompteEnvois.MesMedecin = [];
    CompteEnvois.MesMedecin.push(compte);
    this.administrateurService.compte = CompteEnvois;

    this.administrateurService.ValidationMedecin().subscribe(data => {
      this.compte = data.body;
      this.Lecture();
      //console.log('Validation effectué', data.body);
    });
  }
  Invalider(compte : Compte){
    let CompteEnvois : Compte = new Compte();
    CompteEnvois.IDWeb = this.compte.IDWeb;
    CompteEnvois.MesMedecin = [];
    CompteEnvois.MesMedecin.push(compte);
    this.administrateurService.compte = CompteEnvois;

    this.administrateurService.InValidationMedecin().subscribe(data => {
      this.compte = data.body;
      this.Lecture();
      //console.log('Validation effectué', data.body);
    });
  }
}
