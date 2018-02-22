import { Injectable } from '@angular/core';

// @Injectable()
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