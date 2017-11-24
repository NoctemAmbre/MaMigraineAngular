import { Injectable } from '@angular/core';

import { Medicament } from './medicament';
import { Facteur } from './facteur';

@Injectable()
export class Migraine {
    ID : number;
    Debut : string;
    Fin : string;
    Intensite : string;
    MedicamentsPris : Medicament[];
    Facteurs : Facteur[];
}