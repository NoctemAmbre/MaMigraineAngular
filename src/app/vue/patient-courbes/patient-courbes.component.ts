import { Component, OnInit } from '@angular/core';
import { CompteService } from './../../service/compte/compte.service'
import { PatientService } from './../../service/patient/patient.service'
import { Compte } from '../../model/compte';
import { Synthese } from '../../model/synthese';
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

  constructor(private compteService:CompteService, private patientService:PatientService) { }

  ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    this.patientService.patient.subscribe(res => this.patient = res);
    if (this.compte.IDWeb == this.patient.IDWeb) {this.patient = this.compte; this.patientService.changePatient(this.patient);}
    this.LectureValeurAbscisse();
    this.NombreMoyenMensuel();
  }


  public lineChartData:Array<any> = [
    {data: [1.3,  2.6,  3.1,  2.0,   0.0,   1.6,  3.0],   label: 'Intensité Moyenne'},
    {data: [2,    4,    2,    2,    0,      2,    1],     label: 'Fréquence Mensuel Total'},
    {data: [1,    3,    1,    2,    0,      1,    0],     label: 'Fréquence Mensuel Intensité 1'},
    {data: [1,    0,    0,    0,    0,      1,    0],     label: 'Fréquence Mensuel Intensité 2'},
    {data: [0,    0,    0,    0,    0,      0,    1],     label: 'Fréquence Mensuel Intensité 3'},
    {data: [0,    0,    1,    0,    0,      0,    0],     label: 'Fréquence Mensuel Intensité 4'},
    {data: [0,    1,    0,    0,    0,      0,    0],     label: 'Fréquence Mensuel Intensité 5'}
  ];


  
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public LectureValeurAbscisse()
  {
    //let syntheses : Synthese[] = [];
    //let label : string;
    let ValeurAbscisse:Array<any> = [];
    this.patient.MesMigraines.forEach(elementMigraine => {
      let index : number = ValeurAbscisse.findIndex(elt => elt == elementMigraine.Moi)
      if ( index == -1)
      {
        //let migraine = new Synthese();
        //migraine.label = elementMigraine.Moi;
        //migraine.data = []
        ValeurAbscisse.push(elementMigraine.Moi);
      }
      // else 
      // {
      //   if (syntheses[index].data.
      //   syntheses[index].data
      // }
    });
    console.log(ValeurAbscisse);
    this.lineChartLabels = ValeurAbscisse;
  }

  public NombreMoyenMensuel()
  {
    let _lineChartData:Array<any> = new Array(1);
    
    let syntheses : Synthese[] =  [];
    for (let i = 0; i < this.lineChartLabels.length; i++)
    {
      let synthese : Synthese = new Synthese();
      synthese.abscisse = this.lineChartLabels[i] as string;
      synthese.ordonne = 0;
      // syntheses.push({abscisse : this.lineChartLabels[i] as string, ordonne : 0 as number });
      syntheses.push(synthese);
    }
    this.patient.MesMigraines.forEach(eltMigrain => {
      syntheses.find(eltSynth => eltSynth.abscisse == eltMigrain.Moi).ordonne++;
    });
    console.log(syntheses);
    _lineChartData[0] = {data: new Array(12), label: 'Fréquence mensuel'};
    for (let j = 0; j < this.lineChartLabels.length; j++) {
      //_lineChartData[0].data[j] = Math.floor((Math.random() * 100) + 1);
      _lineChartData[0].data[j] = syntheses[j].ordonne;
    }
 
    this.lineChartData = _lineChartData;
  }


  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
 
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
