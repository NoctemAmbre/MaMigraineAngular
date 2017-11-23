import { Injectable } from '@angular/core';
import { Adresse } from './adresse';
import { Horaire } from './Horaires';
@Injectable()
export class Compte {
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
    NomMedecinAttitre:string;
    IDMedecinAttitre:number;
    Adresse:Adresse;
    Telephone:string;
    TelephonePortable:string;
    AdresseMail:string;
    InfoComplementaire:string;
    HoraireOuverture:Horaire[];
    Token:string;
    Erreur:string;
}