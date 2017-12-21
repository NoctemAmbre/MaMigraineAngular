import { Injectable } from '@angular/core';
@Injectable()
export class Medicament {
    constructor(){};
    ID:number;
    CodeCIS:number;
    DenominationMedicament:string;
    FormePharmaceutique:string;
    VoiesAdministration:string;
    StatutAdministratif:string;
    TypeDeProcedureAutorisation:string;
    EtatCommercialisatoin:string;
    DateAmm:string;
    Statutbdm:string;
    NumeroAutorisation:string;
    Titulaire:string;
    SurveillanceRenforcee:string;
    Quantite:number;
    Selection:boolean;
}