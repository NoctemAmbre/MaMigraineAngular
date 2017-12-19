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
  constructor(private facteurService : FacteurService, private patientService : PatientService) { }

  ngOnInit() {
    this.patientService.patient.subscribe(res => this.patient = res);
  }

  onselect(facteurSelect : Facteur)
  {

  }

  Information(facteurInfo : Facteur)
  {
    this.FacteurAffichage = facteurInfo;
  }

  rechercheFacteur() {
    if (this.FacteurRecherche.length > 4)
    {
      this.facteurService.GetFacteur().subscribe(data => {
        this.facteurService.Entravail = false;        
        this.ListFacteur = (data.body as Facteur[]);
      });
    }
  }
  rechercheToutFacteur() {
    this.facteurService.GetToutFacteur().subscribe(data => {
      this.facteurService.Entravail = false;        
      this.ListFacteur = (data.body as Facteur[]);
    });
  }
}
