import { Injectable } from '@angular/core';
import { Adresse } from './adresse';
import { Horaire } from './Horaires';
@Injectable()
export class Compte {
    constructor(){
        this.IDWeb = 0;
        this.Nom = "";
        this.Prenom = "";
    }
    IDWeb:number;
    Type:boolean;
    Identifiant:string;
    MotDePass:string;
    Sexe:boolean;
    Nom:string;
    Prenom:string;
    DateCreation:string;
    DerniereModif:string;
    CreePar:number;
    DateNaissance:string;
    MesMedecin:Compte[];
    MesPatients:Compte[];
    Adresse:Adresse;
    Telephone:string;
    TelephonePortable:string;
    AdresseMail:string;
    InfoComplementaire:string;
    HoraireOuverture:Horaire[];
    Token:string;
    Erreur:string;
}