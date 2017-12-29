import { Injectable } from '@angular/core';

@Injectable()
export class Synthese {
    lineChartData:Array<any> = [
        {data: [1.3,  2.6,  3.1,  2.0,   0.0,   1.6,  3.0],   label: 'Intensité Moyenne'},
        {data: [2,    4,    2,    2,    0,      2,    1],     label: 'Fréquence Mensuel Total'},
        {data: [1,    3,    1,    2,    0,      1,    0],     label: 'Fréquence Mensuel Intensité 1'},
        {data: [1,    0,    0,    0,    0,      1,    0],     label: 'Fréquence Mensuel Intensité 2'},
        {data: [0,    0,    0,    0,    0,      0,    1],     label: 'Fréquence Mensuel Intensité 3'},
        {data: [0,    0,    1,    0,    0,      0,    0],     label: 'Fréquence Mensuel Intensité 4'},
        {data: [0,    1,    0,    0,    0,      0,    0],     label: 'Fréquence Mensuel Intensité 5'}
      ];

    lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    
    lineChartOptions:any = {responsive: true};
    
    lineChartColors:Array<any> = [
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
    lineChartLegend:boolean = false;
    lineChartType:string = 'line';


    public Valeurs : Valeur[] = [];
}

@Injectable()
export class Valeur {
    abscisse : any;
    ordonne : any;
}