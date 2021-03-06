import { Injectable } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { Adresse } from './adresse';
import { Horaire } from './horaire';
import { Migraine } from './migraine';
import { Medicament } from './medicament';
import { Facteur } from './facteur';
import { Synthese } from './synthese';

@Injectable()
export class Compte {
    constructor(){
        this.IDWeb = 0;
        this.Nom = "";
        this.Prenom = "";
    }
    IDWeb:number;
    Type:number;
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
    MesMigraines:Migraine[];
    MesMedicaments:Medicament[];
    MesFacteurs:Facteur[];
    Adresse:Adresse[];
    Telephone:string;
    TelephonePortable:string;
    AdresseMail:string;
    InfoComplementaire:string;
    HoraireOuverture:Horaire[];
    Officiel:boolean;
    ConfirmationPatient:boolean;
    ConfirmationMedecin:boolean;
    Token:string;
    Erreur:string;
    synthese:Synthese[];
    TableFacteur:MatTableDataSource<Facteur>;
    TableMedicament:MatTableDataSource<Medicament>;
}