import { Injectable } from '@angular/core';
@Injectable()
export class Adresse {
    ID : number;
    Numero : number;
    NomRue : string;
    CodePostal : number;
    Ville : string;
}