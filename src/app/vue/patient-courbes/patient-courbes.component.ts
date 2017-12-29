import { Component, OnInit } from '@angular/core';
import { CompteService } from './../../service/compte/compte.service'
import { PatientService } from './../../service/patient/patient.service'
import { Compte } from '../../model/compte';
import { Synthese, Valeur } from '../../model/synthese';
import { Migraine } from '../../model/migraine';
import { Alert } from 'selenium-webdriver';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-patient-courbes',
  templateUrl: './patient-courbes.component.html',
  styleUrls: ['./patient-courbes.component.css']
})
export class PatientCourbesComponent implements OnInit {
  patient : Compte;
  compte : Compte;
  synthese : Synthese;

  constructor(private compteService:CompteService, private patientService:PatientService) { }

  ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    this.patientService.patient.subscribe(res => this.patient = res);
    this.synthese = new Synthese();
    this.patientService.changeSynthese(this.synthese);
    this.patientService.synthese.subscribe(res => this.synthese = res);
    if (this.compte.IDWeb == this.patient.IDWeb) {this.patient = this.compte; this.patientService.changePatient(this.patient);}
    this.LectureValeurAbscisse();
    this.NombreMensuel();
  }
  public LectureValeurAbscisse()
  {
    let ValeurAbscisse:Array<any> = [];
    this.patient.MesMigraines.forEach(elementMigraine => {
      let index : number = ValeurAbscisse.findIndex(elt => elt == elementMigraine.Moi)
      if ( index == -1)
      {
        ValeurAbscisse.push(elementMigraine.Moi);
      }
    });
    console.log(ValeurAbscisse);
    this.synthese.lineChartLabels = ValeurAbscisse;
    this.patientService.changeSynthese(this.synthese);
  }

  public NombreMensuel()
  {
    let _lineChartData:Array<any> = new Array(1);
    this.synthese.Valeurs = [];

    for (let i = 0; i < this.synthese.lineChartLabels.length; i++)
    {
      let valeur : Valeur = new Valeur();
      valeur.abscisse = this.synthese.lineChartLabels[i] as string;
      valeur.ordonne = 0 as number;
      this.synthese.Valeurs.push(valeur);
    }
    console.log('liste nombre de migraine',this.synthese.Valeurs);

    this.patient.MesMigraines.forEach(eltMigrain => {
      this.synthese.Valeurs.find(eltValeur => eltValeur.abscisse == eltMigrain.Moi).ordonne++;
    });
    console.log(this.synthese.Valeurs);
    _lineChartData[0] = {data: new Array(12), label: 'Fréquence mensuel'};
    for (let j = 0; j < this.synthese.lineChartLabels.length; j++) {
      _lineChartData[0].data[j] = this.synthese.Valeurs[j].ordonne;
    }
 
    this.synthese.lineChartData = _lineChartData;
    this.patientService.changeSynthese(this.synthese);
  }



  public intensiteMoyenMensuel()
  {
    let _lineChartData:Array<any> = new Array(1);
    this.synthese.Valeurs = [];

    //initiation du tableau et ajout du nom du moi
    for (let i = 0; i < this.synthese.lineChartLabels.length; i++)
    {
      let valeur : Valeur = new Valeur();
      valeur.abscisse = this.synthese.lineChartLabels[i] as string;
      valeur.ordonne = [];
      this.synthese.Valeurs.push(valeur);
    }

    //ajout dans le tableau de la liste des intensité de migraine par moi
    this.patient.MesMigraines.forEach(eltMigrain => {
      this.synthese.Valeurs.find(eltValeur => eltValeur.abscisse == eltMigrain.Moi).ordonne.push(eltMigrain.Intensite);
    });
    console.log('liste des intensité',this.synthese.Valeurs);

    //transformation d'un tableau d'intensité en une intensité moyenne
    this.synthese.Valeurs.forEach(elt => {
      let resultat : number = 0;
      elt.ordonne.forEach(element => {
        resultat += element;
      });
      elt.ordonne = resultat / elt.ordonne.length;
    });
    console.log('liste des moyennes',this.synthese.Valeurs);

    //remplissage du tableau pour affichage
    _lineChartData[0] = {data: new Array(12), label: 'Intensité moyenne'};
    for (let j = 0; j < this.synthese.lineChartLabels.length; j++) {
      _lineChartData[0].data[j] = this.synthese.Valeurs[j].ordonne;
    }
    this.synthese.lineChartData = _lineChartData;
    this.patientService.changeSynthese(this.synthese);
  }

  public TempMoyen()
  {
    let _lineChartData:Array<any> = new Array(1);
    this.synthese.Valeurs = [];
    for (let i = 0; i < this.synthese.lineChartLabels.length; i++)
    {
      let valeur : Valeur = new Valeur();
      valeur.abscisse = this.synthese.lineChartLabels[i] as string;
      valeur.ordonne = [];
      this.synthese.Valeurs.push(valeur);
    }

    //ajout dans le tableau de la liste des durée des migraine par moi
    this.patient.MesMigraines.forEach(eltMigrain => {
      this.synthese.Valeurs.find(eltValeur => eltValeur.abscisse == eltMigrain.Moi).ordonne.push(eltMigrain.Duree);
    });

    //transformation d'un tableau de durée en une durée moyenne
    this.synthese.Valeurs.forEach(elt => {
      let resultat : number = 0;
      elt.ordonne.forEach(element => {
        resultat += element;
      });
      elt.ordonne = resultat / elt.ordonne.length;
    });
    console.log('liste des moyennes',this.synthese.Valeurs);
    
    //remplissage du tableau pour affichage
    _lineChartData[0] = {data: new Array(12), label: 'Durée moyenne'};
    for (let j = 0; j < this.synthese.lineChartLabels.length; j++) {
      _lineChartData[0].data[j] = this.synthese.Valeurs[j].ordonne;
    }
    this.synthese.lineChartData = _lineChartData;
    this.patientService.changeSynthese(this.synthese);
  }
}
