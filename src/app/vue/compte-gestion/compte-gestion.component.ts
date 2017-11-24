import { Component, OnInit } from '@angular/core';

import  { EtatCompte } from './../../model/EtatCompte';

@Component({
  selector: 'app-compte-gestion',
  templateUrl: './compte-gestion.component.html',
  styleUrls: ['./compte-gestion.component.css']
})
export class CompteGestionComponent implements OnInit {
  
  //Nouveaucompte : boolean = this.IsNouveauCompte();
  //static EtatDuCompte : EtatCompte = this.PrendreEtatDuCompte();
  EtatDuCompte : number = this.PrendreEtatDuCompte();
  
  constructor() {console.log(EtatCompte.nouveau.toString())}

  ngOnInit() {
  }

  // IsNouveauCompte() : boolean{
  //   let valeur : string = localStorage.getItem('NouveauCompte');
  //   if (valeur == 'true') return true;
  //   else return false;
  // }

  PrendreEtatDuCompte() : number {
    if (localStorage.getItem('EtatCompte') == EtatCompte.aucun.toString()) return 0;
    else if (localStorage.getItem('EtatCompte') == EtatCompte.nouveau.toString()) return 1;
    else if (localStorage.getItem('EtatCompte') == EtatCompte.affichage.toString()) return 2;
    else return 3;
    
  }
  
}
//export enum EtatCompte{'Nouveau','affichage','modification'};



