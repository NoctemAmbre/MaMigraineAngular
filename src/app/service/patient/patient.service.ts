import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http'

import { Patient } from './../../model/patient';
import { CompteService } from './../../service/compte/compte.service';
import { Compte } from './../../model/compte';
import { Medicament } from './../../model/medicament';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//import { PatientsRetour } from './../../metier/patient';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Migraine } from '../../model/migraine';
import { HttpParams } from '@angular/common/http/src/params';
import { Facteur } from '../../model/facteur';
import { Synthese } from '../../model/synthese';

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
  //public facteur:Facteur;
  //public medicament : Medicament;
  public Entravail: boolean = false;

  private patients = new BehaviorSubject<Compte>(new Compte());
  patient = this.patients.asObservable();

  private syntheses = new BehaviorSubject<Synthese>(new Synthese());
  synthese = this.syntheses.asObservable();

  constructor(private http:HttpClient) { }

  changePatient(patient){
    this.patients.next(patient);
  }

  changeSynthese(synthese){
    this.syntheses.next(synthese);
  }

  CherchePatients(){ 
    //var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Token', localStorage.getItem('Token'));  
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var body = JSON.stringify(this.compte);
    console.log('avant envois', body);
    
    this.Entravail = true;
    return this.http.get<Compte[]>('http://localhost:57928/Service1.svc/Patient/Liste?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'), {headers : headers, observe : 'response'});
  }

  public InformationPatient()
  {
    //var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Token', localStorage.getItem('Token'));  
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var body = JSON.stringify(this.compte);
    // console.log('ce qui est envoyé',body);
    // console.log('le patient  dans le service', this.patients.value);
    return this.http.get<Compte>("http://localhost:57928/Service1.svc/Patient/Voir?Value=" + btoa(body) + "&Token=" + localStorage.getItem('Token'), {headers : headers, observe : 'response'});
  }

  public AjoutMedicamentAPatient()
  {
    //var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Token', localStorage.getItem('Token'));  
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var body = JSON.stringify(this.compte);
    console.log('avant envois', this.compte);
    
    this.Entravail = true;
    return this.http.post<Compte>('http://localhost:57928/Service1.svc/Patient/AjoutMedicament?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'),'', {headers : headers, observe : 'response'});
  }

  public SupprimerMedicamentAPatient()
  {
    //var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Token', localStorage.getItem('Token')); 
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var body = JSON.stringify(this.compte);
    console.log('avant envois', this.compte);
    
    this.Entravail = true;
    return this.http.post<Compte>('http://localhost:57928/Service1.svc/Patient/SupprMedicament?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'),'', {headers : headers, observe : 'response'});
  }
  public ListeMigrainesDuPatient()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Token', localStorage.getItem('Token'));  
    //var headers = new Headers().set('Content-Type', 'application/x-www-form-urlencoded').set('Token', localStorage.getItem('Token'));  

    var body = JSON.stringify(this.compte);
    console.log('Get List Migraine', this.compte);
    return this.http.get<Migraine[]>('http://localhost:57928/Service1.svc/Patient/ListMigraine?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'),{headers : headers, observe : 'response'});
  }

  public ListeMedicamentsDuPatient()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Token', localStorage.getItem('Token'));  
    var body = JSON.stringify(this.compte);
    console.log('Get List Medicament', this.compte);
    return this.http.get<Medicament[]>('http://localhost:57928/Service1.svc/Patient/ListMedicament?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'),{headers : headers, observe : 'response'});
  }

  public ListeFacteursDuPatient()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var body = JSON.stringify(this.compte);
    console.log('Get List Facteurs', this.compte);
    return this.http.get<Facteur[]>('http://localhost:57928/Service1.svc/Patient/ListFacteur?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'),{headers : headers, observe : 'response'});
  }

  public AjouterFacteurAuPatient()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var body = JSON.stringify(this.compte);
    console.log('Ajout Facteur à patient', this.compte);
    return this.http.post<Compte>('http://localhost:57928/Service1.svc/Patient/AjouterFacteur?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'),'', {headers : headers, observe : 'response'});
  }

  public SupprimerFacteurAPatient()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var body = JSON.stringify(this.compte);
    console.log('suppr facteur', this.compte);
    return this.http.post<Compte>('http://localhost:57928/Service1.svc/Patient/SupprFacteur?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'),'', {headers : headers, observe : 'response'});
  }

  public AjouterMigraineAPatient()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    var body = JSON.stringify(this.compte);
    console.log('Ajout Migraine', this.compte);
    return this.http.post<Compte>('http://localhost:57928/Service1.svc/Patient/AjoutMigraine?Value='+ btoa(body) + "&Token=" + localStorage.getItem('Token'),'', {headers : headers, observe : 'response'});
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

