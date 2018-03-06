import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams} from '@angular/common/http'
//import { Http, Headers } from '@angular/http';
import { Compte } from './../../model/compte';
import { Horaire } from './../../model/horaire';
import { Adresse } from './../../model/adresse';
import { Product } from './../../model/Products'; //a supprimer après test
//import { Identifiant } from './../../metier/identifiant';
//import { CompteLoginComponent } from './../../vue/Compte-login/Compte-login.component';
//import { JsonService } from './../../service/json/json.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class CompteService {
  //idCompte : number = 0;
  //public static INFO = [];
  //data : any = null; 
  //public compte : Compte;
  private comptes = new BehaviorSubject<Compte>(new Compte());
  compte = this.comptes.asObservable();
  public static CleBasic : string = "j6tYtmgst2XIOIeRsPHR";
  public static WebService = 'http://91.160.28.49:50000/Service1.svc';
  //public static WebService : String = 'http://192.168.1.11:3000/Service1.svc';
  //static WebService : String = 'http://192.168.1.11:57928/Service1.svc';
  //static WebService : String = 'http://192.168.1.11:50000/Service1.svc';
  
  
  
  //public static WebService : String = 'http://localhost:57928/Service1.svc';

  constructor(private http:HttpClient) { }

  changeCompte(compte){
    localStorage.setItem('Token', compte.Token);
    this.comptes.next(compte);
  }

  // public SetIdentifiction (Login : string, Password : string, ConfirmPassword : string) {
  //   console.log(Login);
  //   Identifiant.Login = Login;
  //   Identifiant.Password = Password;
  //   Identifiant.ConfirmPassword = ConfirmPassword;
  // }
  // public GetIdentificatiovn(): Identifiant{
  //   //console.log("valeur = " + Identifiant.Login);
  //     var identifiant : Identifiant = {Login : Identifiant.Login, Password : Identifiant.Password, ConfirmPassword : Identifiant.ConfirmPassword };
  //     return identifiant;
  // }

  // public Login(compteLoginComponent : CompteLoginComponent){
  //   const req = this.http.post('http://localhost/Service1.svc/Patient/login',{ 
  //   "Login":"Noctem",
  //     "Pass":"MonMotDePasse"
  //   },)
  //   .subscribe(
  //     res => {
  //       console.log(res);
  //     },
  //     err => {
  //       console.log("error occured");
  //     }
  //   );
  // }

  public CreationCompte()
  {
    // let comptetest = new CompteTest();
    // comptetest.Nom = "Hermier";
    // comptetest.Prenom = "Bruno";
    //let body = JSON.stringify(comptetest);
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //var body = localStorage.getItem('compte');
    var body = JSON.stringify(this.comptes.value);
    console.log('avant envois', body);
    return this.http.post<Compte>(CompteService.WebService + '/Compte/Ajout?Value=' + btoa(body), '', {headers : headers, observe : 'response'});
  }

  public ModificationCompte()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //var body = localStorage.getItem('compte');
    var body = JSON.stringify(this.comptes.value);
    return this.http.post<Compte>(CompteService.WebService + '/ChangeInformation?Value=' + btoa(body) + "&Token=" + localStorage.getItem('Token'), '', {headers : headers, observe : 'response'});
  }

  public Login(){
    //var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Basic ' + this.comptes.value.Token);
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //var body = localStorage.getItem('compte');
    var body = JSON.stringify({Identifiant : this.comptes.value.Identifiant, MotDePass : this.comptes.value.MotDePass, Token :this.comptes.value.Token });
    
    //var body = JSON.stringify({Identifiant:localStorage.getItem('login'), MotDePass:localStorage.getItem('password')});
    //var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //console.log('Contente type', headers.getAll('Content-Type'));
    //console.log('Authorisation', headers.getAll('Authorisation'));
    
    //headers.append('Authorisation', 'Basic MyKey');
    //headers.append('Accept', 'application/json');

    
    // console.log(localStorage.getItem('Login'));
    // console.log('valeur : ', headers);
      
    //localStorage.setItem('token', 'a20e6aca-ee83-44bc-8033-b41f3078c2b6:c199f9c8-0548-4be79655-7ef7d7bf9d20');
    //console.log(localStorage.getItem('token'));

    //headers.append('Authorization', 'Basic ' + btoa("clientID" + ':' + "MonMotDePass"));
    //console.log('headers : ', headers);
    //return this.http.post<Compte>("http://localhost:57928/Service1.svc/Compte/login", JSON.stringify({Login : "Noctem", Pass : "MonMotDePass"}), {headers, observe : 'response'}, )
    //return this.http.post<Compte>("http://localhost:57928/Service1.svc/Compte/login?Login=" + "Noctem" + "&Pass=" + "MonMotDePass", '', {headers, observe : 'response', responseType : 'json'} )
    //return this.http.post<Compte>("http://localhost:57928/Service1.svc/Compte/login?Login=" + "Noctem" + "&Pass=" + "MonMotDePass", '', {headers : headers, observe : 'response', responseType : 'json'});
    //return this.http.post<Compte>("http://localhost:57928/Service1.svc/Compte/login?Login=" + localStorage.getItem('login') + "&Pass=" + btoa(CompteService.CleBasic + ':' + localStorage.getItem('password')), '', {headers : headers, observe : 'response'});
    //return this.http.post<Compte>("http://localhost:57928/Service1.svc/Compte/login?Token=" + btoa(body), '', {headers : headers, observe : 'response'});
    console.log('ce qui est envoyé',body);
    
    return this.http.post<Compte>(CompteService.WebService + '/Compte/login?Value=' + btoa(body), '', {headers : headers, observe : 'response'});

    // const req = this.http.post('http://localhost/Service1.svc/Patient/Login',{
    //   "Login":"Noctem",
    //   "Pass":"MonMotDePasse"
    // })
    // .subscribe(
    //   res => {
    //     console.log(res);
    //   },
    //   err => {
    //     console.log("error occured");
    //   },
    //   () => {console.log("The POST observable is now completed.");}
    // );
  }

  public NouveauMotDePass()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //var body = JSON.stringify(this.comptes.value);
    var body = JSON.stringify({IDWeb : this.comptes.value.IDWeb, Identifiant : this.comptes.value.Identifiant, MotDePass : this.comptes.value.MotDePass, Token :this.comptes.value.Token});
    console.log('ce qui est envoyé',body);
    
    return this.http.post<Compte>(CompteService.WebService + '/Compte/ChangeMDP?Value=' + btoa(body) + "&Token=" + localStorage.getItem('Token'), '', {headers : headers, observe : 'response'});

  }

  // public GetInfoCompte() : Compte
  // {
  //   //return <Compte>JSON.parse(localStorage.getItem('compte'));
  //   return this.comptes.value;
  // }

  public AttributionMedecin()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    
    //on transmet l'identifiant , l'id et l'id du medecin attitré
    var body = JSON.stringify({Identifiant : this.comptes.value.Identifiant, IDWeb : this.comptes.value.IDWeb, MesMedecin : this.comptes.value.MesMedecin, Token :this.comptes.value.Token });
     
    console.log('ce qui est envoyé',body);
    
    return this.http.post<Compte>(CompteService.WebService + '/Compte/AjoutMedecin?Value=' + btoa(body) + "&Token=" + localStorage.getItem('Token'), '', {headers : headers, observe : 'response'});

  }

  public AttributionPatient()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    var body = JSON.stringify({Identifiant : this.comptes.value.Identifiant, IDWeb : this.comptes.value.IDWeb, MesPatients : this.comptes.value.MesPatients, Token :this.comptes.value.Token });
    //console.log('ce qui est envoyé pour ajoute un patient au medecin',body);
    return this.http.post<Compte>(CompteService.WebService + '/Medecin/AjoutPatient?Value=' + btoa(body) + "&Token=" + localStorage.getItem('Token'), '', {headers : headers, observe : 'response'});
  }

  public ValidationPatient(){
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    var body = JSON.stringify({Identifiant : this.comptes.value.Identifiant, IDWeb : this.comptes.value.IDWeb, MesPatients : this.comptes.value.MesPatients, Token :this.comptes.value.Token });
    return this.http.post<Compte>(CompteService.WebService + '/Medecin/ValiderPatient?Value=' + btoa(body) + "&Token=" + localStorage.getItem('Token'), '', {headers : headers, observe : 'response'});
  }
  public ValidationMedecin(){
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    console.log(this.comptes.value);
    var body = JSON.stringify({Identifiant : this.comptes.value.Identifiant, IDWeb : this.comptes.value.IDWeb, MesMedecin : this.comptes.value.MesMedecin, Token :this.comptes.value.Token });
    console.log("Body", body);
    return this.http.post<Compte>(CompteService.WebService + '/Patient/ValiderMedecin?Value=' + btoa(body) + "&Token=" + localStorage.getItem('Token'), '', {headers : headers, observe : 'response'});
  }

  

  public SuppressionMedecin()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    var body = JSON.stringify({Identifiant : this.comptes.value.Identifiant, IDWeb : this.comptes.value.IDWeb, MesMedecin : this.comptes.value.MesMedecin, Token :this.comptes.value.Token });
    console.log('ce qui est envoyé pour la suppression dun medecin d\'un patient',body);
    return this.http.post<Compte>(CompteService.WebService + '/Compte/SupprMedecin?Value=' + btoa(body) + "&Token=" + localStorage.getItem('Token'), '', {headers : headers, observe : 'response'});
  }

  public SuppressionPatient()
  {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    var body = JSON.stringify({Identifiant : this.comptes.value.Identifiant, IDWeb : this.comptes.value.IDWeb, MesPatients : this.comptes.value.MesPatients, Token :this.comptes.value.Token });
    console.log('ce qui est envoyé pour la suppression dun patient du medecin',body);
    return this.http.post<Compte>(CompteService.WebService + '/Medecin/SupprPatient?Value=' + btoa(body) + "&Token=" + localStorage.getItem('Token'), '', {headers : headers, observe : 'response'});
  }

  public LancementMok() : Compte
  {
    let compteRetour : Compte = new Compte();
    compteRetour.Identifiant = "Noctem";
    compteRetour.MotDePass = "MotDePass";
    compteRetour.Nom = "HERMIER";
    compteRetour.Prenom = "Bruno";
    compteRetour.DateNaissance = "1971-12-28";

    //console.log("avant new Adress()");
    compteRetour.Adresse = [];
    compteRetour.Adresse[0] = new Adresse();
    compteRetour.Adresse[0].Numero = 23;
    compteRetour.Adresse[0].NomRue = "Rue du Moulin";
    compteRetour.Adresse[0].CodePostal = 78420;
    compteRetour.Adresse[0].Ville = "CARRRIERES-SUR-SEINE";
 
    compteRetour.Telephone = "0139130601";
    compteRetour.TelephonePortable = "0611481516";
    compteRetour.AdresseMail = "Noctem.Ambre@hotmail.fr";
    compteRetour.CreePar = 0;
    compteRetour.InfoComplementaire = "Toutes les infos sont ici";
    let compteVide : Compte = new Compte();
    compteRetour.MesMedecin = [];
    compteRetour.MesMedecin.push(compteVide);
    compteRetour.Type = 1;

    compteRetour.HoraireOuverture = [];
    compteRetour.HoraireOuverture.push(new Horaire('Lundi', '08:30', '18:30'));
    compteRetour.HoraireOuverture.push(new Horaire('Mardi','08:00', '17:00'));
    compteRetour.HoraireOuverture.push(new Horaire('Mercredi', '07:30','21:00'));
    compteRetour.HoraireOuverture.push(new Horaire('Jeudi', '09:00', '18:15'));
    compteRetour.HoraireOuverture.push(new Horaire('Vendredi', '10:30','16:30'));
    compteRetour.HoraireOuverture.push(new Horaire('Samedi', '07:30', '19:00'));
    compteRetour.HoraireOuverture.push(new Horaire('Dimanche', '', ''));

    return compteRetour;
  }


  
  connexionTest()
  {
    let info = new ClassTest();
    info.Test = "Test";
    const body = JSON.stringify({Test: info.Test});
    //const headers = new HttpHeaders().set("Content-Type", "x-www-form-urlencoded");
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log('le body envoyé pour le test est : ', body);
    return this.http.post(CompteService.WebService + '/testSimple',body, {headers : headers, observe : 'response'});
  }

  connexionTest1()
  {
    let info = new ClassTest();
    info.Test = "Test";
    const body = JSON.stringify({Test: info.Test});
    const headers = new HttpHeaders().set("Content-Type", "x-www-form-urlencoded");
    //const headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log('le body envoyé pour le test est : ', body);
    this.http.post(CompteService.WebService + '/testSimple',body, {headers : headers, observe : 'response'})
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("error occured");
      },
      () => {console.log("The POST observable is now completed.");}
    );
  }

  
  connexionTest2 (compte: Compte) : Observable<Compte>{
    console.log('Envois de l\'objet ',compte);
    
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.http.post<Compte>(CompteService.WebService + '/testSimple', compte, httpOptions).pipe(
      tap((compte: Compte) => console.log('le résultat est ', compte)));
  }

  createProduct() {
    let param = new URLSearchParams();
    param.set('name','hermier');
    param.set('description','description');
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
   
    //const headers = new HttpHeaders().set("Content-Type", "application/json");
      return this.http.post('http://jsonplaceholder.typicode.com/post', {body : JSON.stringify(param), headers : headers, observe : 'response'}).subscribe(rep => {console.log(rep);})
    /*
    //const httpOptions = {product, headers: new HttpHeaders({ 'Content-Type': 'application/json'}), observe : "body", params: new HttpParams(), responseType:"json"};
    const Body = JSON.stringify({name: product.name, description: product.description});
      return this.http.request('POST', 'http://localhost:57928/Service1.svc/testSimple', {body : Body, headers: new HttpHeaders({'Content-Type': 'application/json'}), observe : 'body', responseType:"json"}).subscribe(
      //return this.http.request('POST', 'http://jsonplaceholder.typicode.com/post', {body : Body, headers: new HttpHeaders({'Content-Type':'application/json'}), observe : "body", responseType:"json"}).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("error occured");
      },
      () => {console.log("The POST observable is now completed.");}
    );*/
  }

  ConnexionTest3()
  {
       let body = {
        'name':'hermier',
        'description':"description",
      };

       let headers = new HttpHeaders();
       //headers.set("Content-Type", "application/json");
       headers = headers.set('Content-Type', 'application/json; charset=utf-8');
       
       
       
      //const req = this.http.post('http://localhost:57928/Service1.svc/testSimple', {body : param, headers : headers, observe : 'response'})
      //return this.http.post('http://jsonplaceholder.typicode.com/post', JSON.stringify(body),  {headers})
      return this.http.post(CompteService.WebService + '/testSimple', JSON.stringify(body),  {headers})
      .map(
        (data) => {console.log(data); return data;}
      );
  }

  ConnexionTest4() : void
  {
    let param = new URLSearchParams();
    param.set('id', '0');
    param.set('name','hermier');
    param.set('description','description');
    const  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Token', localStorage.getItem('Token'));
    //const req = this.http.request('POST', 'http://localhost:57928/Service1.svc/testSimple', {body :param , headers : headers, observe : 'response' } )
    //this.http.options('http://localhost:57928/Service1.svc/testSimple',{headers}).subscribe();
    const req = this.http.request('POST',CompteService.WebService + '/testSimple', {body :param , headers : headers, observe : 'response' } )
      .pipe()
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
  }
  
  ConnexionTest5()
  {
    var etudient : Student = new Student()
    etudient.nom = "WEB";
    etudient.prenom = "ww";
    etudient.tel = "012345678";
    etudient.email = "ww.WEB@internet.com";
    etudient.date_naiss = "1900-01-01";
    
    let bodyMessage = {
      'nom':etudient.nom,
      'prenom':etudient.prenom,
      'tel':etudient.tel,
      'email':etudient.email,
      'date_naiss':etudient.date_naiss
    };



      //  let bodyMessage = new URLSearchParams();
      //  bodyMessage.set('nom',etudient.nom);
      //  bodyMessage.set('prenom',etudient.prenom);
      //  bodyMessage.set('date_naiss',etudient.date_naiss);
      //  bodyMessage.set('tel',etudient.tel);
      //  bodyMessage.set('email',etudient.email);   
       let headers = new HttpHeaders();
       headers = headers.set('Content-Type', 'application/json').set('Token', localStorage.getItem('Token')); 
       this.http.options(CompteService.WebService + '/testSimple',{headers}).subscribe();
       //return this.http.post('http://192.168.1.15:8082/api/students/', JSON.stringify(bodyMessage),  {headers});
       return this.http.post(CompteService.WebService + '/testSimple', JSON.stringify(bodyMessage),  {headers});
      }

  /*
  connexionTest(){
    //let body = "?Test='Test'";
    //let body = "{Index='test'}";
   
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let Valeur = "Le petit chat est mort";
    //let headers = new HttpHeaders().set("Content-Type", "application/json");
    //return this.http.post('http://localhost:57928/Service1.svc/test',{"Index" : "Petit test"},{headers})
    return this.http.post("http://localhost:57928/Service1.svc/test?Index=" + Valeur, '' ,{headers})
  }*/


  //public LoginMok() {
      //return this.http.get<Compte>('http://localhost:57928/Service1.svc/Utilisateur/LoginMok', {observe : 'response'});


    // const req = this.http.get<Compte>('http://localhost:57928/Service1.svc/Utilisateur/LoginMok', {observe : 'response'})    
    // .subscribe(
    //       data => {
    //         if (data) {
    //           console.log(data);
    //           compteLoginComponent.compte = data.body;
    //           CompteService.compte = data.body;
    //         } 
    //         else 
    //         {

    //         }          
    //        }
    //       ,
    //       (err : HttpErrorResponse) => {
    //         if(err.error instanceof Error){
    //           console.log("erreur client");
    //         }
    //         else {
    //           console.log("serveur erreur");
    //         }
    //       });
    //}
}   
@Injectable()
export class ClassTest{
  Test : string;
}

@Injectable()
export class UserResponse {
  login: string;
  bio: string;
  company: string;
}
@Injectable()
export class Student {
  id:number;
  nom:string;
  prenom:string;
  date_naiss:string;
  tel:string;
  email:string;
}


