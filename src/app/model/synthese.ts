import { Injectable, ViewChild } from '@angular/core';
import { Compte } from '../model/compte';
import { and } from '@angular/router/src/utils/collection';

@Injectable()
export class Synthese {

    public lineChartData: Array<any> = [
        { data: [], label: '' },
    ];
    // public lineChartData: Array<any> = [
    //     { data: [], label: 'Nombre Mensuel' },
    //     { data: [], label: 'Intensité Moyenne Mensuel' },
    //     { data: [], label: 'Durée Moyenne Mensuel' },
    // ];


    public lineChartColors:Array<any> = [
        { // grey
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
      ];

    public lineChartLabels: Array<any> = [];

    //public lineChartType:string = 'line';
    public lineChartType:string = 'line';
    public pieChartType:string = 'pie';
    public lineChartOptions: any = { responsive: true };

    //public pieChartLabels:string[] = ['Nombre Mensuel', 'Intensité Moyenne Mensuel', 'Durée Moyenne Mensuel'];
    public pieChartData:number[] = [300, 500, 100];

    lineChartLegend: boolean = false;
    //lineChartType: string = 'line';
    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public Valeurs: Valeur[] = [];

    public ActualisationCourbe(patient : Compte, nb : number){
        console.log('Etape 1.1');
        this.LectureValeurAbscisse(patient);
        console.log('Etape 1.2');
        this.LectureOrdonnee(patient, nb);  
        console.log('Etape 1.3');
    }

    public LectureValeurAbscisse(patient : Compte) {
        console.log('Je regarde parmis ces migraines le moi ', patient.MesMigraines)
        console.log('Je regarde mon patient ', patient)
        let ValeurAbscisse: Array<any> = [];
        patient.MesMigraines.forEach(elementMigraine => {
            console.log('elementMigraine', elementMigraine);
            let index: number = ValeurAbscisse.findIndex(elt => elt == elementMigraine.Moi)
            if (index == -1) {
                ValeurAbscisse.push(elementMigraine.Moi);
            }
        });
        ValeurAbscisse.push("futur");
        this.lineChartLabels = ValeurAbscisse;
    }

    // public LectureOrdonnee(patient : Compte) {

    //     let _lineChartData: Array<any> = new Array(3);
    //     _lineChartData[0] = this.NombreMensuel(patient);
    //     _lineChartData[1] = this.intensiteMoyenMensuel(patient);
    //     _lineChartData[2] = this.TempMoyen(patient);
    //     this.lineChartData = _lineChartData;

    // }

    public LectureOrdonnee(patient : Compte, nb : number) {

        let _lineChartData: Array<any> = new Array(1);
        if (nb == 0)  _lineChartData[0] = this.NombreMensuel(patient);
        if (nb == 1)  _lineChartData[0] = this.intensiteMoyenMensuel(patient);
        if (nb == 2)  _lineChartData[0] = this.TempMoyen(patient);
        this.lineChartData = _lineChartData;
    }

    public NombreMensuel(patient : Compte): [any] {
        let _lineChartData: Array<any> = new Array(1);
            this.Valeurs = [];

            for (let i = 0; i < this.lineChartLabels.length; i++) {
                let valeur: Valeur = new Valeur();
                valeur.abscisse = this.lineChartLabels[i] as string;
                valeur.ordonne = [];
                this.Valeurs.push(valeur);
            }

            patient.MesMigraines.forEach(eltMigrain => {
                this.Valeurs.find(eltValeur => eltValeur.abscisse == eltMigrain.Moi).ordonne++;
            });

            _lineChartData[0] = { data: new Array(this.lineChartLabels.length), label: 'Fréquence mensuel' };
            for (let j = 0; j < this.lineChartLabels.length; j++) {
                _lineChartData[0].data[j] = this.Valeurs[j].ordonne;
            }
            return _lineChartData[0];
    }



    public intensiteMoyenMensuel(patient : Compte): [any] {
        let _lineChartData: Array<any> = new Array(1);
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
            for (let j = 0; j < this.lineChartLabels.length; j++) {
                _lineChartData[0].data[j] = this.Valeurs[j].ordonne;
            }
            //ajoute de 0 a la fin du tableau
            _lineChartData[0].data[_lineChartData[0].data.length - 1] = 0;
            return _lineChartData[0];
    }

    public TempMoyen(patient : Compte): [any] {
        let _lineChartData: Array<any> = new Array(1);

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
            for (let j = 0; j < this.lineChartLabels.length; j++) {
                _lineChartData[0].data[j] = this.Valeurs[j].ordonne;
            }
            _lineChartData[0].data[_lineChartData[0].data.length - 1] = 0;
            return _lineChartData[0];
    }
}

@Injectable()
export class Valeur {
    abscisse: any;
    ordonne: any;
}