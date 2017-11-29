import { Component, OnInit } from '@angular/core';
import { MedicamentService } from './../../service/medicament/medicament.service';
import { CompteService } from './../../service/compte/compte.service';
import { PatientService } from './../../service/patient/patient.service';
import { Medicament } from './../../model/medicament';

import { Compte } from './../../model/compte';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-medicament-gestion',
  templateUrl: './medicament-gestion.component.html',
  styleUrls: ['./medicament-gestion.component.css']
})
export class MedicamentGestionComponent implements OnInit {

  title = 'abgular 4 with jquery';

  compte : Compte;
  MedicamentRecherche : string;
  ListMedicaments : Medicament[] = [];
  MedicamentSelectionne : Medicament;

  constructor(private medicamentService : MedicamentService,private compteService : CompteService) { }

  ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    //this.medicamentService.Entravail = false;
  }

  onselect(medicament : Medicament) : void
  {
    //console.log(medicament);
      
    $( function() {
      $( document ).tooltip();
    } );
  
  }

  rechercheMedicament() {
    console.log(this.medicamentService.Entravail);
    //if (this.MedicamentRecherche.length > 4 && this.medicamentService.Entravail == false)
    if (this.MedicamentRecherche.length > 4)
    {
      this.medicamentService.Entravail = true;
      console.log('le nom a chercher est : ',this.MedicamentRecherche);
      let medicament : Medicament = new Medicament();
      medicament.DenominationMedicament = this.MedicamentRecherche;

      let compteEnvois : Compte = new Compte();
      compteEnvois.IDWeb = this.compte.IDWeb;
      compteEnvois.Token = this.compte.Token;
      compteEnvois.MesMedicaments = [];
      compteEnvois.MesMedicaments.push(medicament);
      this.medicamentService.compte = compteEnvois;
      console.log('le compte a envoyer est : ', compteEnvois);
      this.medicamentService.GetMedicament().subscribe(data => {
        this.medicamentService.Entravail = false;
        console.log(data.body);
        this.ListMedicaments = (data.body as Medicament[]);
        //this.medicamentService.Entravail = false;
      });
    }
  }
}
