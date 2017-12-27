import { Component, OnInit } from '@angular/core';
import { Facteur, TypeReponse, TypeFacteur } from '../../model/facteur';
//import { CompteService } from './../../service/compte/compte.service';
import { PatientService } from './../../service/patient/patient.service';
import { FacteurService } from './../../service/facteur/facteur.service';
import { Compte } from '../../model/compte';


@Component({
  selector: 'app-facteur-gestion',
  templateUrl: './facteur-gestion.component.html',
  styleUrls: ['./facteur-gestion.component.css']
})
export class FacteurGestionComponent implements OnInit {

  patient : Compte;
  //compte : Compte;
  ListFacteur : Facteur[] = [];
  FacteurRecherche : string;
  FacteurAffichage : Facteur;
  FacteurSelectionne : Facteur;
  NouveauFacteur : Facteur = new Facteur();
  AffichageNouveauFacteur : boolean = false;
  AffichageModificationFacteur : boolean = false;
  texttypeFacteur : string = "Type de facteur";
  texttypeReponse : string = "Type de réponse";
  constructor(private facteurService : FacteurService, private patientService : PatientService) { }

  ngOnInit() {
    this.patientService.patient.subscribe(res => this.patient = res);
    //this.compteService.compte.subscribe(res => this.compte = res);
    this.facteurService.GetListTypeFacteur().subscribe(data => this.facteurService.ListeTypeFacteur = data.body);
    this.facteurService.GetListTypeReponse().subscribe(data => this.facteurService.ListeTypeReponse = data.body);
  }

  Supprimer(facteurAsupprimer : Facteur)
  {
    let FacteurEnvois : Facteur = new Facteur();
    FacteurEnvois.ID = facteurAsupprimer.ID;
    this.facteurService.Facteur = FacteurEnvois;
    this.facteurService.SupressionFacteur().subscribe(data => {      
      this.ListFacteur = (data.body as Facteur[]);
    });
  }
  Modifier(facteurAModifier : Facteur)
  {


    this.NouveauFacteur = facteurAModifier;
    if (this.AffichageModificationFacteur == true)  this.AffichageModificationFacteur = false;
    else this.AffichageModificationFacteur = true;
  }

  //dans un patient on ajoute dans un nouveau Facteur l'id de celui-ci affin qu'il soit ajouté
  AjouterAPatient(facteurAAjouterPatient : Facteur)
  {
    let patientEnvois : Compte = new Compte();
    patientEnvois.IDWeb = this.patient.IDWeb;
    patientEnvois.MesFacteurs = [];

    let FacteurEnvois : Facteur = new Facteur()
    FacteurEnvois.ID = facteurAAjouterPatient.ID;

    patientEnvois.MesFacteurs.push(FacteurEnvois);

    this.patientService.compte = patientEnvois;

    this.patientService.AjouterFacteurAuPatient().subscribe(data => {      
      this.patient = (data.body as Compte);
      this.patientService.changePatient(this.patient);
    });
  }

  Information(facteurInfo : Facteur)
  {
    this.FacteurAffichage = facteurInfo;
  }

  rechercheFacteur() {
    if (this.FacteurRecherche.length > 4)
    {
      this.ListFacteur = [];
      this.facteurService.Facteur = new Facteur();
      this.facteurService.Facteur.Nom = this.FacteurRecherche;
      this.facteurService.GetFacteur().subscribe(data => {
        this.facteurService.Entravail = false;        
        this.ListFacteur = (data.body as Facteur[]);
      });
    }
    else { //on vide la liste dans le cas ou il y a moins de 4 caractère frappé dans le champs de recherche
      if (this.ListFacteur.length > 0) this.ListFacteur = [];
    }
  }
  rechercheToutFacteur() {
    if (this.ListFacteur.length > 0) this.ListFacteur = [];
    else 
    {
      this.facteurService.GetToutFacteur().subscribe(data => {
        this.facteurService.Entravail = false;
        console.log("tout les facteurs : ", data.body); 
        this.ListFacteur = (data.body as Facteur[]);
      });
    }
  }

  AffichagenouveauFacteur(){
    if (this.AffichageNouveauFacteur == false) this.AffichageNouveauFacteur = true;
    else this.AffichageNouveauFacteur = false;
  }
  AjoutNouveauFacteur(){
    this.AffichageModificationFacteur = false;
    console.log('Le facteur a créer : ', this.NouveauFacteur);
    
    this.facteurService.Facteur = this.NouveauFacteur;
    //console.log('Avant création nouveau Facteur', JSON.stringify(this.NouveauFacteur) );
    this.facteurService.AjoutFacteur().subscribe(data => {    
      this.ListFacteur = (data.body as Facteur[]);
      this.AffichageNouveauFacteur = false;
    });
  }

  ModificationFacteur(){
    
    this.AffichageModificationFacteur = false;
    console.log('Le facteur a modifier : ', this.NouveauFacteur);
    // let FacteurEnvois : Facteur = new Facteur();
    // FacteurEnvois.ID = this.NouveauFacteur.ID;
    // FacteurEnvois.Nom = this.NouveauFacteur.Nom;
    // FacteurEnvois.Question = this.NouveauFacteur.Question;
    // FacteurEnvois.TypeDeFacteur = null;
    // FacteurEnvois.TypeDeReponse = null;
    //FacteurEnvois.TypeDeFacteur = facteurAModifier.TypeDeFacteur;
    //FacteurEnvois.TypeDeReponse = facteurAModifier.TypeDeReponse;

    var facteurEnvois : Facteur = new Facteur();
    facteurEnvois.ID = this.NouveauFacteur.ID;
    facteurEnvois.Nom = this.NouveauFacteur.Nom;
    facteurEnvois.Question = this.NouveauFacteur.Question;
    facteurEnvois.TypeDeFacteur = new TypeFacteur();
    facteurEnvois.TypeDeReponse = new TypeReponse();
    facteurEnvois.TypeDeFacteur.ID = this.NouveauFacteur.TypeDeFacteur.ID;
    facteurEnvois.TypeDeReponse.ID = this.NouveauFacteur.TypeDeReponse.ID;

    this.facteurService.Facteur = facteurEnvois;
    this.facteurService.ModificationFacteur().subscribe(data => {
      this.ListFacteur = (data.body as Facteur[]);
      this.AffichageModificationFacteur = false;
    });
  }

  ChoisiTypeFacteur(typeFacteur : TypeFacteur)
  {
    this.texttypeFacteur = typeFacteur.Type;
    this.NouveauFacteur.TypeDeFacteur = typeFacteur;
  }
  ChoisiTypeReponse(typeReponse : TypeReponse)
  {
    this.texttypeReponse = typeReponse.Type;
    this.NouveauFacteur.TypeDeReponse = typeReponse;
  }

  Annule()
  {
    this.AffichageModificationFacteur = false;
    this.AffichageNouveauFacteur = false;
  }
}
