import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { Compte } from './../../model/compte';

import { CompteService } from './../../service/compte/compte.service';
import { AdministrateurService } from './../../service/administrateur/administrateur.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-administrateur-console',
  templateUrl: './administrateur-console.component.html',
  styleUrls: ['./administrateur-console.component.css']
})
export class AdministrateurConsoleComponent implements OnInit {

  
  //compte : Compte;
  //dataSource = new UserDataSource(this.compteService, this.administrateurService);
  //displayedColumns = ['name', 'email', 'phone', 'company'];
  //displayedColumns = ['Nom', 'Prénom', 'Identifiant'];

  constructor(private compteService : CompteService,
              private administrateurService : AdministrateurService,
              private router:Router) { }

  ngOnInit() {
    // this.compteService.compte.subscribe(res => this.compte = res);
    // if (this.compte.IDWeb == 0) this.router.navigate(['prospec']); 
    // if (this.compte == null) this.router.navigate(['prospec']); 
    //console.log('le compte de conexion admin',this.compte);
    //this.ListMedecin();
  }

  // ListMedecin() : void
  // {
  //   this.administrateurService.compte = this.compte;
  //   this.administrateurService.ListMedecin().subscribe(data => {     
  //       this.compte.MesMedecin = data.body;
  //       console.log('ce qui revient', data.body);
  //       this.compteService.changeCompte(this.compte);    
  //   });
  // }

}

// export class UserDataSource extends DataSource<any> {
//   compte : Compte;
  
//   constructor(private compteService : CompteService, private administrateurService : AdministrateurService ){super();}

//   connect() : Observable<Compte[]> {
//     this.compteService.compte.subscribe(res => this.compte = res);

//     let CompteEnvois : Compte = new Compte();
//     CompteEnvois.IDWeb = this.compte.IDWeb;

//     this.administrateurService.compte = CompteEnvois;
//     return this.administrateurService.ListMedecin();
//   }
//   disconnect() {

//   }
// }
