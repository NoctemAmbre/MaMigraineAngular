import { Injectable } from '@angular/core';

import { Medicament } from './medicament';
import { Facteur } from './facteur';
import {NgbTimeStruct, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Patient } from './patient';

const DateDebut = {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()};
const DateFin = {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()};
const HeureDebut = {hour: new Date().getHours(), minute: new Date().getMinutes(), second : new Date().getSeconds()};
const HeureFin = {hour: new Date().getHours(), minute: new Date().getMinutes(), second : new Date().getSeconds()};

@Injectable()
export class Migraine {
    ID          : number;
    Debut       : string;
    Fin         : string;
    DateDebut   : NgbDateStruct;
    DateFin     : NgbDateStruct;
    HeureDebut  : NgbTimeStruct;
    HeureFin    : NgbTimeStruct;
    Duree       : number;
    Moi         : string;
    Intensite   : string;
    MedicamentsPris : Medicament[];
    Facteurs    : Facteur[];
    Complet     : Boolean;
}