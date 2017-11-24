import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http'

import { Patient } from './../../model/patient';
import { CompteService } from './../../service/compte/compte.service';
import { Compte } from './../../model/compte';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//import { PatientsRetour } from './../../metier/patient';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class PatientService {

  //data : any = null;
  //data : Patient[] = null;
  //toto : Map<number,Patient>;
  //element : Patient;
  //retour : Map<number,string>;
  //retourString : string[];
  //NAME = [];

  public compte:Compte;
  public Entravail: boolean = false;

  private patients = new BehaviorSubject<Compte>(new Compte());
  patient = this.patients.asObservable();

  constructor(private http:HttpClient) { }

  changePatient(patient){
    this.patients.next(patient);
  }


  CherchePatients(){ 
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    var body = JSON.stringify(this.compte);
    console.log('avant envois', body);
    
    this.Entravail = true;
    return this.http.get<Compte[]>('http://localhost/Service1.svc/Patient/Liste?Value='+ btoa(body), {headers : headers, observe : 'response'});
  }

  public InformationPatient()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    var body = JSON.stringify(this.compte);
    console.log('ce qui est envoyé',body);
    console.log('le patient  dans le service', this.patients.value);
    return this.http.get<Compte>("http://localhost:57928/Service1.svc/Patient/Voir?Value=" + btoa(body), {headers : headers, observe : 'response'});
  }

/*
  //ListePatients() : Map<number,Patient>{  
    ListePatients() :Patient[]{  
    this.http.get<ItemResponce>('http://localhost/Service1.svc/Patient/Liste')
    //this.http.get('http://localhost/Service1.svc/Patient/Liste')
        .subscribe(
          data => {
            this.data = data.resultat;
            
            //console.log(this.data);
            if (data) {this.NAME.push(data)}
            //return this.NAME;
            //var RETOUR : Array<Patient> = null;
            //var RETOUR : Patient[] = null;
            //RETOUR.push(this.data);
            //this.data.forEach(element => {
              //this.element = element;
              //console.log(this.element.Login);
              //RETOUR.push(this.element);
              //this.toto.set(1,this.element);
              //console.log(this.element.Login);
              //this.toto.set()
          })

             //return this.data;
            //console.log(this.data);
          //}
          ,
          (err : HttpErrorResponse) => {
            if(err.error instanceof Error){
              console.log("erreur client");
              return this.NAME;
            }
            else {
              console.log("serveur erreur");
              return this.NAME;
            }
          };
          return this.NAME;
    }
*/

    // public GetInfoPatient() : Compte
    // {
    //   return <Compte>JSON.parse(localStorage.getItem('compte'));
    // }

    // ListePatients1() : Map<number,string>{
    //   for (let key of Array.from(this.retour.keys()))
    //   {
    //     console.log(key);
    //   }
    //   return this.retour;
    // }
    
    // ListePatients2() : name[]{
    //   for (let i = 0; i < 10 ; i++)
    //   {
    //     let newname = {id : i, name : i.toString()};
    //     this.NAME.push(newname);
    //   }
    //   return this.NAME;
    // }
}
// interface ItemResponce{
//   resultat : Patient[];
// }
// export class Compte {
//   Identifiant:number;
//   Type:string;
//   Login:string;
//   MotDePass:string;
//   Nom:string;
//   Prenom:string;
//   DateCreation:string;
//   DerniereModif:string;
//   CreePar:number;
//   Age:number;
//   NomMedecin:string;
//   IDMedecin:number;
//   Adress:string;
//   Telephone:string;
//   InfoComplementaire:string;
// }

