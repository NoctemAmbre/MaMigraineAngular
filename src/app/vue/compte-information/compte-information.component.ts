import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
//import { Popup } from 'ng2-opd-popup';
//import { DialogService } from "ng2-bootstrap-modal";


import { CompteService } from './../../service/compte/compte.service';
import { MedecinService } from './../../service/medecin/medecin.service';
import { Compte } from './../../model/compte';
import { EtatCompte } from './../../model/EtatCompte';


//jQuery
declare var jquery :any;
declare var $ :any;

@Component({
  selector: 'app-compte-information',
  templateUrl: './compte-information.component.html',
  styleUrls: ['./compte-information.component.css'],
  providers : [MedecinService]
})
export class CompteInformationComponent implements OnInit {
  //@Input() comptetest: Compte;
  //compte : Compte = <Compte>(JSON.parse(localStorage.getItem('compte')));
  compte : Compte;
  NouveaMotDePass : boolean = false;
  ListMedecin : Compte[] = null;

  time = {hour: 13, minute: 30};
  
  constructor(private compteService : CompteService,
              private medecinservice : MedecinService,
              private router:Router,
              //private dialogService:DialogService
              //private popup:Popup
            ) {
    
    //this.compte = this.compteService.GetInfoCompte();
    //if (this.compte == null) this.router.navigate(['nouveau']);
    console.log('compte a visionner : ', this.compte);
   }

  ngOnInit() {
    console.log('le compte a affiché', this.compte);
    this.compteService.compte.subscribe(res => this.compte = res);
    this.compteService.changeCompte(this.compte);
    
    if (this.compte.IDWeb == 0) this.router.navigate(['prospec']); 
    if (this.compte == null) this.router.navigate(['prospec']); 
    // if (this.compte.Type) this.router.navigate(['mespatients']);
    // if (!this.compte.Type) this.router.navigate(['mondocteur']);
    console.log('Information', this.compte);
  }
  ChMotDePass(){
    this.NouveaMotDePass = true;
  }

  onselect(compte : Compte) : void
  {
    this.compte.MesMedecin = [];
    this.compte.MesMedecin.push(compte);
    this.ListMedecin = null;
    this.compteService.changeCompte(this.compte);
    this.compteService.AttributionMedecin().subscribe(data => {     
        this.compte = data.body;
        console.log('ce qui revient', data.body);
        this.compteService.changeCompte(this.compte);    
    });
  }
  ModificationCompte(){
    this.compteService.changeCompte(this.compte);
    //localStorage.setItem('EtatCompte', EtatCompte.modification.toString());
    //console.log('Modification du compte : ', localStorage.getItem('EtatCompte'));
    this.router.navigate(['modification']);
    
    //window.location.reload();
    //$('#wrap_global').load(location.href + '#wrap_global');
  }

  ListDesMedecins()
  {
    this.compteService.changeCompte(this.compte);
    this.medecinservice.ListMedecin().subscribe(data => {
      this.ListMedecin = data.body;
      console.log('retour Liste Des Medecins', data.body);
      if (data.body.length > 0) {   
        console.log(data.body);
      }
    });
  }
}
