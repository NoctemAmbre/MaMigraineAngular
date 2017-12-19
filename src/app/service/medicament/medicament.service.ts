import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http'

import { Compte } from '../../model/compte';
import { Medicament } from '../../model/medicament';

@Injectable()
export class MedicamentService {

  compte : Compte;
  public Entravail : boolean = false;
  

  constructor(private http:HttpClient) { }

  GetMedicament() {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    var body = JSON.stringify(this.compte);
    console.log('avant envois', body);
    
    this.Entravail = true;
    return this.http.get<Medicament[]>('http://localhost:57928/Service1.svc/Medicament/Liste?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'), {headers : headers, observe : 'response'});
    
  }
}
