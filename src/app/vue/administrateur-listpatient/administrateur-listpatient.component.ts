import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { Compte } from './../../model/compte';

import { CompteService } from './../../service/compte/compte.service';
import { AdministrateurService } from './../../service/administrateur/administrateur.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-administrateur-listpatient',
  templateUrl: './administrateur-listpatient.component.html',
  styleUrls: ['./administrateur-listpatient.component.css']
})
export class AdministrateurListpatientComponent implements OnInit {

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

  displayedColumns = ['Nom', 'Prénom', 'Identifiant', 'Supprimer'];

  constructor(private compteService : CompteService,
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
    this.administrateurService.ListPatient().subscribe(data => {
      this.Listcompte = data;
      //console.log('retour requête', data)
      this.dataSource = new MatTableDataSource<Compte>(this.Listcompte);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    });
  }

}
