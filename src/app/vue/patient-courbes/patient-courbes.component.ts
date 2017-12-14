import { Component, OnInit } from '@angular/core';
import { PatientService } from './../../service/patient/patient.service'
import { Compte } from '../../model/compte';

@Component({
  selector: 'app-patient-courbes',
  templateUrl: './patient-courbes.component.html',
  styleUrls: ['./patient-courbes.component.css']
})
export class PatientCourbesComponent implements OnInit {
  patient : Compte;
  constructor(private patientService:PatientService) { }

  ngOnInit() {
    this.patientService.patient.subscribe(res => this.patient = res);
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
  public lineChartLegend:boolean = true;
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
