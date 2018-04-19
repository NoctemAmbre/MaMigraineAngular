import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { Compte } from './../../model/compte';

import { CompteService } from './../../service/compte/compte.service';
import { AdministrateurService } from './../../service/administrateur/administrateur.service';
import { Observable } from 'rxjs/Observable';
import { TypeReponse } from '../../model/facteur';

@Component({
  selector: 'app-administrateur-listtypereponse',
  templateUrl: './administrateur-listtypereponse.component.html',
  styleUrls: ['./administrateur-listtypereponse.component.css']
})
export class AdministrateurListtypereponseComponent implements OnInit {

  compte : Compte;
  ListTypeReponse : TypeReponse[];
  dataSource = new MatTableDataSource<TypeReponse>(this.ListTypeReponse);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.Lecture();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns = ['Type', 'Information', 'Supprimer'];

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
      this.administrateurService.ListTypeReponse().subscribe(data => {
        this.ListTypeReponse = data;
        //console.log('retour requête', data)
        this.dataSource = new MatTableDataSource<TypeReponse>(this.ListTypeReponse);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      });
    }

}
