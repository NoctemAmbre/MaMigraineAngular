import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http'

import { Facteur, TypeFacteur, TypeReponse } from '../../model/facteur';
import { CompteService } from '../compte/compte.service';

@Injectable()
export class FacteurService {

  Facteur : Facteur;
  public Entravail : boolean = false;
  public ListeTypeFacteur : TypeFacteur[];
  public ListeTypeReponse : TypeReponse[];
  //public WebService : String = 'http://192.168.1.11:3000/Service1.svc';
  //private WebService = 'http://86.195.103.177:3000/Service1.svc';


  constructor(private http:HttpClient) { }

  GetListTypeFacteur()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    return this.http.get<TypeFacteur[]>(CompteService.WebService + '/TypeFacteur/Liste?Token=' + localStorage.getItem('Token'), {headers : headers, observe : 'response'});
  }

  GetListTypeReponse()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    return this.http.get<TypeReponse[]>(CompteService.WebService + '/TypeReponse/Liste?Token=' + localStorage.getItem('Token'), {headers : headers, observe : 'response'});
  }

  GetFacteur() {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var body = JSON.stringify(this.Facteur);
    console.log('avant envois', body);
    
    this.Entravail = true;
    return this.http.get<Facteur[]>(CompteService.WebService + '/Facteur/Liste?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'), {headers : headers, observe : 'response'});
    
  }
  GetToutFacteur()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
   
    this.Entravail = true;
    return this.http.get<Facteur[]>(CompteService.WebService + '/Facteur/Liste?Token=' + localStorage.getItem('Token'), {headers : headers, observe : 'response'});
  }

  AjoutFacteur()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var body = JSON.stringify(this.Facteur);
    console.log('avant envois', body);
    
    this.Entravail = true;
    return this.http.post<Facteur[]>(CompteService.WebService + '/Facteur/Ajout?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'),'', {headers : headers, observe : 'response'});
  }

  ModificationFacteur()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var body = JSON.stringify(this.Facteur);
    console.log('avant envois', body);
    
    this.Entravail = true;
    return this.http.post<Facteur[]>(CompteService.WebService + '/Facteur/Modification?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'),'', {headers : headers, observe : 'response'});
  }

  SupressionFacteur()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var body = JSON.stringify(this.Facteur);
    console.log('avant envois', body);
    
    this.Entravail = true;
    return this.http.post<Facteur[]>(CompteService.WebService + '/Facteur/Suppression?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'),'', {headers : headers, observe : 'response'});
  }

}
