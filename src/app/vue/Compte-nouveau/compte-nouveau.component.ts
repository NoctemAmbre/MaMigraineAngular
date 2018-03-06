import { Component, OnInit, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { MedecinService } from './../../service/medecin/medecin.service';
import { PatientService } from './../../service/patient/patient.service';
import { CompteService } from './../../service/compte/compte.service';
import { CodepostalService } from './../../service/codepostal/codepostal.service';

import { Compte } from './../../model/compte';
import { Adresse } from './../../model/adresse';
import { Cities } from './../../model/cities';
import { Reponse } from './../../model/reponse';
import { Horaire } from './../../model/horaire';
import { EtatCompte } from './../../model/EtatCompte';

@Component({
  selector: 'app-compte-nouveau',
  templateUrl: './compte-nouveau.component.html',
  styleUrls: ['./compte-nouveau.component.css'],
  providers : [CodepostalService]
})
export class CompteNouveauComponent implements OnInit {

  compte : Compte;
  ConfirmationMotDePass : string;
  //NouvelleAdresse:Adresse = new Adresse();
  reponse:Reponse;
  ListCities:Cities[];
  CitiesSelect:Cities;
  InfoMotDePass:string;
  Identique:string;
 
  constructor(private codepostalService:CodepostalService,
              private router:Router,          
              private compteService:CompteService) {
    //console.log(this.compte.HoraireOuverture);
   }

  ngOnInit() {
    console.log('Arrivé dans nouveau');
    this.compteService.compte.subscribe(res => this.compte = res);
    console.log('après subscribe');
    this.compteService.changeCompte(this.compte);
    console.log('Nouveau', this.compte);
    this.compte = this.compteService.LancementMok();
  }

 

  rechercheCodePostal()
  {
      if (this.compte.Adresse[0].CodePostal != null && this.compte.Adresse[0].CodePostal.toString().length > 3){
        this.codepostalService.chercheCP(this.compte.Adresse[0].CodePostal).subscribe(data => this.ListCities = (data.body as Reponse).cities);
      }
  }

  rechercheNomVille()
  {
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

  ChoixType(type:number){
    this.compte.Type = type;
    console.log(this.compte.Type);
       
    
    //if (type == 1)   this.compte = this.compteService.LancementMok();
    //else this.compte.HoraireOuverture = null;
  }

  ChoixSexe(genre:boolean){
    this.compte.Sexe = genre;
  }

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

  Creation(){ 
    this.compte.Token = btoa(CompteService.CleBasic);
    this.compteService.changeCompte(this.compte);
    //localStorage.setItem('compte', JSON.stringify(this.compte));
    console.log('c est ce compte là qui sera envoyé', this.compte);
    // let CompteJSON = JSON.stringify(this.nouveaucompte);
    // localStorage.setItem('Compte', CompteJSON);
    this.compteService.CreationCompte().subscribe(data => {
      this.compte = data.body;
      this.compteService.changeCompte(this.compte);
      //localStorage.setItem('compte', JSON.stringify(this.compte));
      //localStorage.setItem('EtatCompte', EtatCompte.aucun.toString());
      this.router.navigate(['prospec']);
      console.log('retour = ', this.compte);
    });
  }
}
