import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CompteService } from './../../service/compte/compte.service';
import { CodepostalService } from './../../service/codepostal/codepostal.service';

import { Compte } from './../../model/compte';
import { Adresse } from './../../model/adresse';
import { Cities } from './../../model/cities';
import { Reponse } from './../../model/reponse';
import { Horaire } from './../../model/horaire';
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

  ConfirmationMotDePass : string;
  InfoMotDePass:string;
  Identique:string;
  // NouveaMotDePass : boolean = false;

  constructor(private codepostalService:CodepostalService,
              private compteService:CompteService,
              private router:Router) {

  }

  ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    this.compteService.changeCompte(this.compte);
    if (this.compte.IDWeb == 0) this.router.navigate(['prospec']); 
    if (this.compte == null) this.router.navigate(['prospec']); 
    console.log('modification', this.compte);
  }

  ChoixSexe(genre:boolean){
    this.compte.Sexe = genre;
  }

  rechercheCodePostal()
  {
    console.log(this.compte.Adresse[0].CodePostal.toString());
      if (this.compte.Adresse[0].CodePostal != null && this.compte.Adresse[0].CodePostal.toString().length > 3){
        this.codepostalService.chercheCP(this.compte.Adresse[0].CodePostal).subscribe(data => {this.ListCities = (data.body as Reponse).cities; console.log(this.ListCities);});
      }
  }

  rechercheNomVille()
  {
    console.log(this.compte.Adresse[0].Ville);
    if (this.compte.Adresse[0].Ville.length > 4)
    {
        this.codepostalService.chercheVille(this.compte.Adresse[0].Ville).subscribe(data => this.ListCities = (data.body as Reponse).cities);
    }
  }

  onselect(cities : Cities) : void
  {
    this.compte.Adresse[0].CodePostal = cities.code;
    this.compte.Adresse[0].Ville = cities.city;
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

  // ChMotDePass(){
  //   this.NouveaMotDePass = true;
  // }

  NiveauMotDepass(){
    let puissance = 0;
    let information = "";
    if (this.compte.MotDePass.match(/^(?=.{6,20})/)) { information+="(plus de 5 caractères)";puissance++;}
    if (this.compte.MotDePass.match(/^(?=.*[a-z])/)) { information+="(minuscule)";puissance++;}
    if (this.compte.MotDePass.match(/^(?=.*[A-Z])/)) { information+="(majuscule)";puissance++;}
    if (this.compte.MotDePass.match(/^(?=.*[0-9])/)) { information+="(chiffre)";puissance++;}
    if (this.compte.MotDePass.match(/^(?=.*[!@#\$%\^&\*])/)) { information+="(spéciaux)";puissance++;}

    switch (puissance) {
      case 0:
        this.InfoMotDePass = information + " : " + puissance.toString() + "/5";
        break;
        case 1:
        this.InfoMotDePass = information + " : " +  puissance.toString() + "/5";
        break;
        case 2:
        this.InfoMotDePass = information + " : " +  puissance.toString() + "/5";
        break;
        case 3:
        this.InfoMotDePass = information + " : " +  puissance.toString() + "/5";
        break;
        case 4:
        this.InfoMotDePass = information + " : " +  puissance.toString() + "/5";
        break;
        case 5:
        this.InfoMotDePass = information + " : " +  puissance.toString() + "/5";
        break;
      default:
        break;
    }
  }
  
  identique() {
    if (this.compte.MotDePass != undefined)
    {
      if (this.compte.MotDePass == this.ConfirmationMotDePass) this.Identique = "Mot de passe identique"; else this.Identique = "";
    }
  }

}
