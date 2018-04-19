import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams} from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Compte } from './../../model/compte';

import { CompteService } from '../compte/compte.service';
import { Medicament } from '../../model/medicament';
import { Facteur, TypeReponse, TypeFacteur } from '../../model/facteur';

@Injectable()
export class AdministrateurService {

  compte : Compte;

  constructor(private http:HttpClient) { }

  ListMedecin()
  {
    var body = JSON.stringify(this.compte);
    console.log('avant envois', body);
    return this.http.get<Compte[]>(CompteService.WebService + '/Administrateur/Medecin/Liste?Value=' + btoa(body)+ "&Token=" + localStorage.getItem('Token'));
  }

  ListPatient()
  {
    var body = JSON.stringify(this.compte);
    console.log('avant envois', body);
    return this.http.get<Compte[]>(CompteService.WebService + '/Administrateur/Patient/Liste?Value=' + btoa(body)+ "&Token=" + localStorage.getItem('Token'));
  }

  ListMedicament()
  {
    var body = JSON.stringify(this.compte);
    console.log('avant envois', body);
    return this.http.get<Medicament[]>(CompteService.WebService + '/Administrateur/Medicament/Liste?Value=' + btoa(body)+ "&Token=" + localStorage.getItem('Token'));
  }

  ListFacteur()
  {
    var body = JSON.stringify(this.compte);
    console.log('avant envois', body);
    return this.http.get<Facteur[]>(CompteService.WebService + '/Administrateur/Facteur/Liste?Value=' + btoa(body)+ "&Token=" + localStorage.getItem('Token'));
  }

  ListTypeFacteur()
  {
    var body = JSON.stringify(this.compte);
    console.log('avant envois', body);
    return this.http.get<TypeFacteur[]>(CompteService.WebService + '/Administrateur/TypeFacteur/Liste?Value=' + btoa(body)+ "&Token=" + localStorage.getItem('Token'));
  }

  ListTypeReponse()
  {
    var body = JSON.stringify(this.compte);
    console.log('avant envois', body);
    return this.http.get<TypeReponse[]>(CompteService.WebService + '/Administrateur/TypeReponse/Liste?Value=' + btoa(body)+ "&Token=" + localStorage.getItem('Token'));
  }

  ValidationMedecin()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    var body = JSON.stringify(this.compte);
    console.log('avant envois', body);
    return this.http.post<Compte>(CompteService.WebService + '/Administrateur/Medecin/Validation?Value=' + btoa(body)+ "&Token="  + localStorage.getItem('Token'), '', {headers : headers, observe : 'response'});
  }
  InValidationMedecin()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    var body = JSON.stringify(this.compte);
    console.log('avant envois', body);
    return this.http.post<Compte>(CompteService.WebService + '/Administrateur/Medecin/InValidation?Value=' + btoa(body)+ "&Token="  + localStorage.getItem('Token'), '', {headers : headers, observe : 'response'});
  }



}
