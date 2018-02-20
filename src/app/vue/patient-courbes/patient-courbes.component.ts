import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { CompteService } from './../../service/compte/compte.service'
import { PatientService } from './../../service/patient/patient.service'
import { SyntheseService } from './../../service/synthese/synthese.service';
import { Compte } from '../../model/compte';
import { Synthese, Valeur } from '../../model/synthese';
import { Migraine } from '../../model/migraine';
import { Alert } from 'selenium-webdriver';
import { forEach } from '@angular/router/src/utils/collection';
import { Patient } from '../../model/patient';

@Component({
  selector: 'app-patient-courbes',
  templateUrl: './patient-courbes.component.html',
  styleUrls: ['./patient-courbes.component.css']
})
export class PatientCourbesComponent implements OnInit {
  patient : Compte;
  compte : Compte;
  //synthese : Synthese;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  
  constructor(private compteService:CompteService, private patientService:PatientService, private syntheseService : SyntheseService) { }

  ngOnInit() {
    
    this.compteService.compte.subscribe(res => this.compte = res);
    this.patientService.patient.subscribe(res => this.patient = res);
    
    
    if (this.compte.IDWeb == this.patient.IDWeb) {this.patient = this.compte;}
    if (this.patient.synthese == null){ 
      this.patient.synthese = new Synthese();
      this.patient.synthese.courbe1 = true;
      this.patient.synthese.courbe2 = false;
      this.patient.synthese.courbe3 = false;
    }
    this.patient.synthese.ActualisationCourbe(this.patient);
    this.patientService.changePatient(this.patient);
  }

  Actualisation(){
    this.patient.synthese.ActualisationCourbe(this.patient);
    this.chart.chart.config.data.labels = this.patient.synthese.lineChartLabels;
  }

  // public ActualisationCourbe(){
  //   this.synthese = new Synthese();
  //   this.LectureValeurAbscisse();
  //   this.LectureOrdonnee();
  //   this.syntheseService.changeSynthese(this.synthese);
  // }
  
  // public LectureValeurAbscisse()
  // {
  //   let ValeurAbscisse:Array<any> = [];
  //     this.patient.MesMigraines.forEach(elementMigraine => {
  //     let index : number = ValeurAbscisse.findIndex(elt => elt == elementMigraine.Moi)
  //     if ( index == -1)
  //     {
  //       ValeurAbscisse.push(elementMigraine.Moi);
  //     }
  //   });
  //   this.synthese.lineChartLabels = ValeurAbscisse;
  //   this.syntheseService.changeSynthese(this.synthese);
  // } 

  // public LectureOrdonnee(){
  //   console.log(this.synthese.courbe1);
  //   console.log(this.synthese.courbe2);
  //   console.log(this.synthese.courbe3);

  //   let _lineChartData:Array<any> = new Array(3);
  //   _lineChartData[0] = this.NombreMensuel();
  //   _lineChartData[1] = this.intensiteMoyenMensuel();
  //   _lineChartData[2] = this.TempMoyen();
  //   this.synthese.lineChartData = _lineChartData;

  //   this.syntheseService.changeSynthese(this.synthese);
  // }

  // public NombreMensuel() : [any]
  // {
  //   let _lineChartData:Array<any> = new Array(1);
  //   if (this.synthese.courbe1){
      
  //     this.synthese.Valeurs = [];

  //     for (let i = 0; i < this.synthese.lineChartLabels.length; i++)
  //     {
  //       let valeur : Valeur = new Valeur();
  //       valeur.abscisse = this.synthese.lineChartLabels[i] as string;
  //       valeur.ordonne = 0 as number;
  //       this.synthese.Valeurs.push(valeur);
  //     }
  //     //console.log('liste nombre de migraine',this.synthese.Valeurs);

  //     this.patient.MesMigraines.forEach(eltMigrain => {
  //       this.synthese.Valeurs.find(eltValeur => eltValeur.abscisse == eltMigrain.Moi).ordonne++;
  //     });
      
  //     _lineChartData[0] = {data: new Array(this.synthese.lineChartLabels.length), label: 'Fréquence mensuel'};
  //     for (let j = 0; j < this.synthese.lineChartLabels.length; j++) {
  //       _lineChartData[0].data[j] = this.synthese.Valeurs[j].ordonne;
  //     }
      
  //     return _lineChartData[0];
  //   }
  //   else {
  //     _lineChartData[0] = {data: new Array(this.synthese.lineChartLabels.length), label: 'Fréquence mensuel'};
  //     return _lineChartData[0];
  //   }
  // }



  // public intensiteMoyenMensuel() : [any]
  // {
  //   let _lineChartData:Array<any> = new Array(1);

  //   if (this.synthese.courbe2){
  //     this.synthese.Valeurs = [];

  //     //initiation du tableau et ajout du nom du moi
  //     for (let i = 0; i < this.synthese.lineChartLabels.length; i++)
  //     {
  //       let valeur : Valeur = new Valeur();
  //       valeur.abscisse = this.synthese.lineChartLabels[i] as string;
  //       valeur.ordonne = [];
  //       this.synthese.Valeurs.push(valeur);
  //     }

  //     //ajout dans le tableau de la liste des intensité de migraine par moi
  //     this.patient.MesMigraines.forEach(eltMigrain => {
  //       this.synthese.Valeurs.find(eltValeur => eltValeur.abscisse == eltMigrain.Moi).ordonne.push(eltMigrain.Intensite);
  //     });
      

  //     //transformation d'un tableau d'intensité en une intensité moyenne
  //     this.synthese.Valeurs.forEach(elt => {
  //       let resultat : number = 0;
  //       elt.ordonne.forEach(element => {
  //         resultat += element;
  //       });
  //       elt.ordonne = resultat / elt.ordonne.length;
  //     });
      

  //     //remplissage du tableau pour affichage
  //     _lineChartData[0] = {data: new Array(this.synthese.lineChartLabels.length), label: 'Intensité moyenne'};
  //     for (let j = 0; j < this.synthese.lineChartLabels.length; j++) {
  //       _lineChartData[0].data[j] = this.synthese.Valeurs[j].ordonne;
  //     }
      
  //     return _lineChartData[0];
  //   }
  //   else{
  //     _lineChartData[0] = {data: new Array(this.synthese.lineChartLabels.length), label: 'Intensité moyenne'};
  //     return _lineChartData[0];
  //   }
  // }

  // public TempMoyen() : [any]
  // {
  //   let _lineChartData:Array<any> = new Array(1);

  //   if (this.synthese.courbe3){
  //     this.synthese.Valeurs = [];
  //     for (let i = 0; i < this.synthese.lineChartLabels.length; i++)
  //     {
  //       let valeur : Valeur = new Valeur();
  //       valeur.abscisse = this.synthese.lineChartLabels[i] as string;
  //       valeur.ordonne = [];
  //       this.synthese.Valeurs.push(valeur);
  //     }

  //     //ajout dans le tableau de la liste des durée des migraine par moi
  //     this.patient.MesMigraines.forEach(eltMigrain => {
  //       this.synthese.Valeurs.find(eltValeur => eltValeur.abscisse == eltMigrain.Moi).ordonne.push(eltMigrain.Duree);
  //     });

  //     //transformation d'un tableau de durée en une durée moyenne
  //     this.synthese.Valeurs.forEach(elt => {
  //       let resultat : number = 0;
  //       elt.ordonne.forEach(element => {
  //         resultat += element;
  //       });
  //       elt.ordonne = resultat / elt.ordonne.length;
  //     });
      
      
  //     //remplissage du tableau pour affichage
  //     _lineChartData[0] = {data: new Array(this.synthese.lineChartLabels.length), label: 'Durée moyenne'};
  //     for (let j = 0; j < this.synthese.lineChartLabels.length; j++) {
  //       _lineChartData[0].data[j] = this.synthese.Valeurs[j].ordonne;
  //     }
      
  //     return _lineChartData[0];
  //   }
  //   else{
  //     _lineChartData[0] = {data: new Array(this.synthese.lineChartLabels.length), label: 'Durée moyenne'};
  //     return _lineChartData[0];
  //   }
  // }
}
