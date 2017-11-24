import { Component, OnInit } from '@angular/core';
import { CompteService } from './../../service/compte/compte.service';
import { Compte } from './../../model/compte';

@Component({
  selector: 'app-compte-changemotdepass',
  templateUrl: './compte-changemotdepass.component.html',
  styleUrls: ['./compte-changemotdepass.component.css'],
  //providers : [CompteService]
})
export class CompteChangemotdepassComponent implements OnInit {
  compte: Compte;
  ConfirmMotDePass : string;
  InfoMotDePass:string;
  Identique:string;

  constructor(private compteService : CompteService) {
    //this.compte = this.compteService.GetInfoCompte();
   }

   ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    this.compteService.changeCompte(this.compte);
    console.log('changePassword', this.compte);
  }

   Envois(){
    this.compteService.changeCompte(this.compte);
    //localStorage.setItem('compte', JSON.stringify(this.compte));
    //console.log('infor avant envois',localStorage.getItem('compte'));
    //this.compteService.Login(this.identifiant).subscribe(data =>{ this.compte = data.body; console.log('retour', data.body) });
    this.compteService.NouveauMotDePass().subscribe(data => {
      this.compte = data.body;
      console.log('retour', data.body);
      if (data.body.Erreur == null) {
        this.compteService.changeCompte(this.compte);
        //localStorage.setItem('compte', JSON.stringify(data.body));
        //localStorage.setItem('EtatCompte', EtatCompte.affichage.toString());
        //CompteGestionComponent.EtatDuCompte = 'affichage';
        //this.router.navigate(['info', this.compte]);
        //this.router.navigate(['affichage']);
      }
    });
     
    // this.compteService.().subscribe(data => {
    //   this.compteModif = data.body;
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
      if (this.compte.MotDePass == this.ConfirmMotDePass) this.Identique = "Mot de passe identique"; else this.Identique = "";
    }
  }
}
