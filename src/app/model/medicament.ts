import { Injectable } from '@angular/core';
@Injectable()
export class Medicament {
    ID:number;
    CodeCIS:number;
    DenominationMedicment:string;
    FromePharmaceutique:string;
    VoieAdministration:string;
    StatutAdministratif:string;
    TypeDeProcedureAutorisation:string;
    EtatCommercialisatoin:string;
    StatutDbm:string;
    NumeroAutorisation:string;
    Titulaire:string;
    SurveillanceRenforcee:string;
}