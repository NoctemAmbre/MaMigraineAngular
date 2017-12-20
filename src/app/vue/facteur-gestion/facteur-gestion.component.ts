import { Component, OnInit } from '@angular/core';
import { Facteur } from '../../model/facteur';
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
  ListFacteur : Facteur[] = [];
  FacteurRecherche : string;
  FacteurAffichage : Facteur;
  FacteurSelectionne : Facteur;
  NouveauFacteur : Facteur = new Facteur();
  AffichageNouveauFacteur : boolean = false;
  AffichageModificationFacteur : boolean = false;
  texttypeFacteur : string = "Type de facteur";
  constructor(private facteurService : FacteurService, private patientService : PatientService) { }

  ngOnInit() {
    this.patientService.patient.subscribe(res => this.patient = res);
  }

  Supprimer(facteurAsupprimer : Facteur)
  {
    this.facteurService.Facteur = facteurAsupprimer;
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

  AjouterAPatient(facteurAAjouterPatient : Facteur)
  {
    var patientEnvois : Compte = new Compte();
    patientEnvois.IDWeb = this.patient.IDWeb;
    patientEnvois.MesFacteurs = [];
    patientEnvois.MesFacteurs.push(facteurAAjouterPatient);
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
      this.facteurService.Facteur = new Facteur();
      this.facteurService.Facteur.Nom = this.FacteurRecherche;
      this.facteurService.GetFacteur().subscribe(data => {
        this.facteurService.Entravail = false;        
        this.ListFacteur = (data.body as Facteur[]);
      });
    }
  }
  rechercheToutFacteur() {
    if (this.ListFacteur.length > 0) this.ListFacteur = [];
    else 
    {
      this.facteurService.GetToutFacteur().subscribe(data => {
        this.facteurService.Entravail = false;        
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
    this.facteurService.Facteur = this.NouveauFacteur;
    this.facteurService.AjoutFacteur().subscribe(data => {    
      this.ListFacteur = (data.body as Facteur[]);
      this.AffichageNouveauFacteur = false;
    });
  }

  ModificationFacteur(){
    this.AffichageModificationFacteur = false;
    this.facteurService.Facteur = this.NouveauFacteur;
    this.facteurService.ModificationFacteur().subscribe(data => {
      this.facteurService.Entravail = false;        
      this.ListFacteur = (data.body as Facteur[]);
      this.AffichageModificationFacteur = false;
    });
  }

  Choisi(ValeurChoisit : boolean)
  {
    console.log(ValeurChoisit);
    if (ValeurChoisit) this.texttypeFacteur = "Facteur Favorable";
    else this.texttypeFacteur = "Facteur défavorable";
    this.NouveauFacteur.Type = ValeurChoisit;
  }

  Annule()
  {
    this.AffichageModificationFacteur = false;
    this.AffichageNouveauFacteur = false;
  }
}
