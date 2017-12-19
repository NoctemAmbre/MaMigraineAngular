import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http'

import { Facteur } from '../../model/facteur';

@Injectable()
export class FacteurService {

  FacteurRecherche : Facteur;
  public Entravail : boolean = false;
  constructor(private http:HttpClient) { }

  GetFacteur() {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    var body = JSON.stringify(this.FacteurRecherche);
    console.log('avant envois', body);
    
    this.Entravail = true;
    return this.http.get<Facteur[]>('http://localhost:57928/Service1.svc/Facteur/Liste?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'), {headers : headers, observe : 'response'});
    
  }
  GetToutFacteur()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
   
    this.Entravail = true;
    return this.http.get<Facteur[]>('http://localhost:57928/Service1.svc/Facteur/Liste?Token=' + localStorage.getItem('Token'), {headers : headers, observe : 'response'});
    
  }

}
