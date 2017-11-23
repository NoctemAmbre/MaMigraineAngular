import { Injectable } from '@angular/core';
@Injectable()
export class HorairesSemaine {
    ListHoraires:Horaire[] = [];
    constructor(){
        this.ListHoraires.push(new Horaire('Lundi', '08:30', '18:30'));
        this.ListHoraires.push(new Horaire('Mardi','08:00', '17:00'));
        this.ListHoraires.push(new Horaire('Mercredi', '07:30','21:00'));
        this.ListHoraires.push(new Horaire('Jeudi', '09:00', '18:15'));
        this.ListHoraires.push(new Horaire('Vendredi', '10:30','16:30'));
        this.ListHoraires.push(new Horaire('Samedi', '07:30', '19:00'));
        this.ListHoraires.push(new Horaire('Dimanche', '', ''));
    }
}
export class Horaire{
    constructor(jour:string, matin:string, soir:string){
        this.Jour = jour;
        this.Matin = matin;
        this.Soir = soir;
    }
    Jour:string;
    Matin:string;
    Soir:string;
}