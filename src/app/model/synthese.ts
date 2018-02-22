import { Injectable, ViewChild } from '@angular/core';
import { Compte } from '../model/compte';
import { and } from '@angular/router/src/utils/collection';
//import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Injectable()
export class Synthese {
    // public lineChartData:Array<any> = [
    //     [],
    //     [],
    //     []
    //   ];
    public lineChartData: Array<any> = [
        { data: [], label: 'Nombre Mensuel' },
        { data: [], label: 'Intensité Moyenne Mensuel' },
        { data: [], label: 'Durée Moyenne Mensuel' },
    ];

    //public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartLabels: Array<any> = [];

    //public lineChartType:string = 'line';
    public lineChartType:string = 'line';
    public pieChartType:string = 'pie';
    public lineChartOptions: any = { responsive: true };

    public pieChartLabels:string[] = ['Nombre Mensuel', 'Intensité Moyenne Mensuel', 'Durée Moyenne Mensuel'];
    public pieChartData:number[] = [300, 500, 100];

    // public randomizeType():void {
    //     this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    //     this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
    // }

    // lineChartColors: Array<any> = [
    //     { // grey
    //         backgroundColor: 'rgba(148,159,177,0.2)',
    //         borderColor: 'rgba(148,159,177,1)',
    //         pointBackgroundColor: 'rgba(148,159,177,1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //     },
    //     { // dark grey
    //         backgroundColor: 'rgba(77,83,96,0.2)',
    //         borderColor: 'rgba(77,83,96,1)',
    //         pointBackgroundColor: 'rgba(77,83,96,1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(77,83,96,1)'
    //     },
    //     { // grey
    //         backgroundColor: 'rgba(148,159,177,0.2)',
    //         borderColor: 'rgba(148,159,177,1)',
    //         pointBackgroundColor: 'rgba(148,159,177,1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //     }
    // ];
    lineChartLegend: boolean = true;
    //lineChartType: string = 'line';
    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public Valeurs: Valeur[] = [];
    // public courbe1: boolean = true;
    // public courbe2: boolean = false;
    // public courbe3: boolean = false;

    //@ViewChild(BaseChartDirective) chart: BaseChartDirective;

    public ActualisationCourbe(patient : Compte){
        this.LectureValeurAbscisse(patient);
        this.LectureOrdonnee(patient);  
    }

    public LectureValeurAbscisse(patient : Compte) {

        

        let ValeurAbscisse: Array<any> = [];
        patient.MesMigraines.forEach(elementMigraine => {
            let index: number = ValeurAbscisse.findIndex(elt => elt == elementMigraine.Moi)
            if (index == -1) {
                ValeurAbscisse.push(elementMigraine.Moi);
            }
        });
        ValeurAbscisse.push("futur");
        this.lineChartLabels = ValeurAbscisse;
        //console.log('le char',this.chart);
        //this.chart.chart.config.data.labels = ValeurAbscisse;
    }

    public LectureOrdonnee(patient : Compte) {
        // console.log(this.courbe1);
        // console.log(this.courbe2);
        // console.log(this.courbe3);

        let _lineChartData: Array<any> = new Array(3);
        _lineChartData[0] = this.NombreMensuel(patient);
        _lineChartData[1] = this.intensiteMoyenMensuel(patient);
        _lineChartData[2] = this.TempMoyen(patient);
        this.lineChartData = _lineChartData;

    }

    public NombreMensuel(patient : Compte): [any] {
        let _lineChartData: Array<any> = new Array(1);
        // if (this.courbe1) {

            this.Valeurs = [];

            for (let i = 0; i < this.lineChartLabels.length; i++) {
                let valeur: Valeur = new Valeur();
                valeur.abscisse = this.lineChartLabels[i] as string;
                valeur.ordonne = [];
                this.Valeurs.push(valeur);
            }
            
            //console.log('liste nombre de migraine',this.synthese.Valeurs);

            patient.MesMigraines.forEach(eltMigrain => {
                this.Valeurs.find(eltValeur => eltValeur.abscisse == eltMigrain.Moi).ordonne++;
            });
        

            _lineChartData[0] = { data: new Array(this.lineChartLabels.length), label: 'Fréquence mensuel' };
            //_lineChartData[0] =  new Array(this.lineChartLabels.length);
            for (let j = 0; j < this.lineChartLabels.length; j++) {
                _lineChartData[0].data[j] = this.Valeurs[j].ordonne;
                //_lineChartData[0][j] = this.Valeurs[j].ordonne;
            }
            
            return _lineChartData[0];
        //}
        // else {
        //     _lineChartData[0] = { data: new Array(this.lineChartLabels.length), label: 'Fréquence mensuel' };
        //     //_lineChartData[0] = new Array(this.lineChartLabels.length);
        //     return _lineChartData[0];
        // }
    }



    public intensiteMoyenMensuel(patient : Compte): [any] {
        let _lineChartData: Array<any> = new Array(1);

        // if (this.courbe2) {
            this.Valeurs = [];

            //initiation du tableau et ajout du nom du moi
            for (let i = 0; i < this.lineChartLabels.length; i++) {
                let valeur: Valeur = new Valeur();
                valeur.abscisse = this.lineChartLabels[i] as string;
                valeur.ordonne = [];
                this.Valeurs.push(valeur);
            }

            //ajout dans le tableau de la liste des intensité de migraine par moi
            patient.MesMigraines.forEach(eltMigrain => {
                this.Valeurs.find(eltValeur => eltValeur.abscisse == eltMigrain.Moi).ordonne.push(eltMigrain.Intensite);
            });


            //transformation d'un tableau d'intensité en une intensité moyenne
            this.Valeurs.forEach(elt => {
                let resultat: number = 0;
                elt.ordonne.forEach(element => {
                    resultat += element;
                });
                elt.ordonne = resultat / elt.ordonne.length;
            });


            //remplissage du tableau pour affichage
            _lineChartData[0] = { data: new Array(this.lineChartLabels.length), label: 'Intensité moyenne' };
            //_lineChartData[0] = new Array(this.lineChartLabels.length);
            for (let j = 0; j < this.lineChartLabels.length; j++) {
                _lineChartData[0].data[j] = this.Valeurs[j].ordonne;
                //_lineChartData[0][j] = this.Valeurs[j].ordonne;
            }
            //ajoute de 0 a la fin du tableau
            _lineChartData[0].data[_lineChartData[0].data.length - 1] = 0;
            //_lineChartData[0][_lineChartData[0].length - 1] = 0;
            return _lineChartData[0];
        // }
        // else {
        //     _lineChartData[0] = { data: new Array(this.lineChartLabels.length), label: 'Intensité moyenne' };
        //     //_lineChartData[0] = new Array(this.lineChartLabels.length);
        //     return _lineChartData[0];
        // }
    }

    public TempMoyen(patient : Compte): [any] {
        let _lineChartData: Array<any> = new Array(1);

        //if (this.courbe3) {
            this.Valeurs = [];
            for (let i = 0; i < this.lineChartLabels.length; i++) {
                let valeur: Valeur = new Valeur();
                valeur.abscisse = this.lineChartLabels[i] as string;
                valeur.ordonne = [];
                this.Valeurs.push(valeur);
            }

            //ajout dans le tableau de la liste des durée des migraine par moi
            patient.MesMigraines.forEach(eltMigrain => {
                this.Valeurs.find(eltValeur => eltValeur.abscisse == eltMigrain.Moi).ordonne.push(eltMigrain.Duree);
            });

            //transformation d'un tableau de durée en une durée moyenne
            this.Valeurs.forEach(elt => {
                let resultat: number = 0;
                elt.ordonne.forEach(element => {
                    resultat += element;
                });
                elt.ordonne = resultat / elt.ordonne.length;
            });


            //remplissage du tableau pour affichage
            _lineChartData[0] = { data: new Array(this.lineChartLabels.length), label: 'Durée moyenne' };
            //_lineChartData[0] = new Array(this.lineChartLabels.length);
            for (let j = 0; j < this.lineChartLabels.length; j++) {
                _lineChartData[0].data[j] = this.Valeurs[j].ordonne;
                //_lineChartData[0][j] = this.Valeurs[j].ordonne;
            }
            _lineChartData[0].data[_lineChartData[0].data.length - 1] = 0;
            //_lineChartData[0][_lineChartData[0].length - 1] = 0;
            return _lineChartData[0];
        // }
        // else {
        //     _lineChartData[0] = { data: new Array(this.lineChartLabels.length), label: 'Durée moyenne' };
        //     //_lineChartData[0] = new Array(this.lineChartLabels.length);
        //     return _lineChartData[0];
        // }
    }
}

@Injectable()
export class Valeur {
    abscisse: any;
    ordonne: any;
}