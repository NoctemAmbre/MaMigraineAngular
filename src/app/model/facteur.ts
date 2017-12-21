import { Injectable } from '@angular/core';
@Injectable()
export class Facteur {
    ID : number;
    Nom : string;
    Question : string;
    Selection : boolean;
    Reponse : number;
    TypeDeFacteur : TypeFacteur;
    TypeDeReponse : TypeReponse;
}

@Injectable()
export class TypeFacteur {
    ID : number;
    Type : string;
}

@Injectable()
export class TypeReponse {
    ID : number;
    Type : string;
    Information : string;
}