import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http'

import { Facteur } from '../../model/facteur';

@Injectable()
export class FacteurService {

  Facteur : Facteur;
  public Entravail : boolean = false;
  constructor(private http:HttpClient) { }

  GetFacteur() {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var body = JSON.stringify(this.Facteur);
    console.log('avant envois', body);
    
    this.Entravail = true;
    return this.http.get<Facteur[]>('http://localhost:57928/Service1.svc/Facteur/Liste?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'), {headers : headers, observe : 'response'});
    
  }
  GetToutFacteur()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
   
    this.Entravail = true;
    return this.http.get<Facteur[]>('http://localhost:57928/Service1.svc/Facteur/Liste?Token=' + localStorage.getItem('Token'), {headers : headers, observe : 'response'});
  }

  AjoutFacteur()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var body = JSON.stringify(this.Facteur);
    console.log('avant envois', body);
    
    this.Entravail = true;
    return this.http.post<Facteur[]>('http://localhost:57928/Service1.svc/Facteur/Ajout?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'),'', {headers : headers, observe : 'response'});
  }

  ModificationFacteur()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var body = JSON.stringify(this.Facteur);
    console.log('avant envois', body);
    
    this.Entravail = true;
    return this.http.post<Facteur[]>('http://localhost:57928/Service1.svc/Facteur/Modification?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'),'', {headers : headers, observe : 'response'});
  }

  SupressionFacteur()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var body = JSON.stringify(this.Facteur);
    console.log('avant envois', body);
    
    this.Entravail = true;
    return this.http.post<Facteur[]>('http://localhost:57928/Service1.svc/Facteur/Suppression?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'),'', {headers : headers, observe : 'response'});
  }

}
