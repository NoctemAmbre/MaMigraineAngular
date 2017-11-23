import { Injectable } from '@angular/core';
import { Medicament } from './Medicament';
@Injectable()
export class Ordonnance {
    ID:number;
    IdPatient:number;
    ListMedicament:Medicament[];
}