import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CompteService } from './../../service/compte/compte.service';
import { CodepostalService } from './../../service/codepostal/codepostal.service';

import { Compte } from './../../model/compte';
import { Adresse } from './../../model/adresse';
import { Cities } from './../../model/cities';
import { Reponse } from './../../model/reponse';
import { Horaire } from './../../model/Horaires';
import  { EtatCompte } from './../../model/EtatCompte';

@Component({
  selector: 'app-compte-modification',
  templateUrl: './compte-modification.component.html',
  styleUrls: ['./compte-modification.component.css'],
  providers : [CodepostalService]
})
export class CompteModificationComponent implements OnInit {
  compte : Compte;
  ListCities:Cities[];
  CitiesSelect:Cities;
  constructor(private codepostalService:CodepostalService,
              private compteService:CompteService,
              private router:Router) {

  }

  ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    this.compteService.changeCompte(this.compte);
    console.log('modification', this.compte);
  }

  ChoixSexe(genre:boolean){
    this.compte.Sexe = genre;
  }

  rechercheCodePostal()
  {
      if (this.compte.Adresse.CodePostal != null && this.compte.Adresse.CodePostal.toString().length > 3){
        this.codepostalService.chercheCP(this.compte.Adresse.CodePostal).subscribe(data => this.ListCities = (data.body as Reponse).cities);
      }
  }

  rechercheNomVille()
  {
    if (this.compte.Adresse.Ville.length > 4)
    {
        this.codepostalService.chercheVille(this.compte.Adresse.Ville).subscribe(data => this.ListCities = (data.body as Reponse).cities);
    }
  }

  onselect(cities : Cities) : void
  {
    this.compte.Adresse.CodePostal = cities.code;
    this.compte.Adresse.Ville = cities.city;
    this.ListCities = null;
  }

  Modification(){ 
    this.compteService.changeCompte(this.compte);
    //localStorage.setItem('compte', JSON.stringify(this.compte));
    console.log('c est ce compte là qui sera envoyé', this.compte);
    // let CompteJSON = JSON.stringify(this.nouveaucompte);
    // localStorage.setItem('Compte', CompteJSON);
    this.compteService.ModificationCompte().subscribe(data => {
      this.compte = data.body;
      this.compteService.changeCompte(this.compte);
      //localStorage.setItem('compte', JSON.stringify(this.compte));
      //localStorage.setItem('EtatCompte', EtatCompte.affichage.toString());
      console.log('retour = ', this.compte);
      this.router.navigate(['affichage']);
    });
  }

}
