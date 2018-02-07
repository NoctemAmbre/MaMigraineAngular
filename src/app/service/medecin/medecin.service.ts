import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Compte } from './../../model/compte';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class MedecinService {

  private medecins = new BehaviorSubject<Compte>(new Compte());
  medecin = this.medecins.asObservable();

  public compte:Compte;
  public Entravail: boolean = false;
  public WebService : String = 'http://192.168.1.11:3000/Service1.svc';
  //private WebService = 'http://86.195.103.177:3000/Service1.svc';


  constructor(private http:HttpClient) { }

  changeMedecin(medecin){
    this.medecins.next(medecin);
  }

  ChercheMedecins(){ 
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    var body = JSON.stringify(this.compte);
    console.log('avant envois', body);
    
    this.Entravail = true;
    return this.http.get<Compte[]>(this.WebService + '/Medecin/Liste?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'), {headers : headers, observe : 'response'});
  }

  ListMedecin()
  {
      return this.http.get<Compte[]>(this.WebService + '/Medecin/Liste', {observe : 'response'});
  }

  public InformationMedecin()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    var body = JSON.stringify(this.compte);
    console.log('ce qui est envoyé',body);
    console.log('le Médecin dans le service', this.medecins.value);
    return this.http.get<Compte>(this.WebService + '/Medecin/Voir?Value=' + btoa(body) + "&Token=" + localStorage.getItem('Token'), {headers : headers, observe : 'response'});
  }
}

