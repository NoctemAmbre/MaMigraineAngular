import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http'

import { Compte } from '../../model/compte';
import { Medicament } from '../../model/medicament';
import { CompteService } from '../compte/compte.service';

@Injectable()
export class MedicamentService {

  compte : Compte;
  public Entravail : boolean = false;
  //public WebService : String = 'http://192.168.1.11:3000/Service1.svc';
  //private WebService = 'http://86.195.103.177:3000/Service1.svc';

  

  constructor(private http:HttpClient) { }

  GetMedicament() {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    var body = JSON.stringify(this.compte);
    console.log('avant envois', body);
    
    this.Entravail = true;
    return this.http.get<Medicament[]>(CompteService.WebService + '/Medicament/Liste?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'), {headers : headers, observe : 'response'});
    
  }
}
