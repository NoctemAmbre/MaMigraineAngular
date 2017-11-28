import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http'

import { CompteService } from './../../service/compte/compte.service';
import { CompteTestService } from './../../service/compte/compte-test.service';
import { Compte } from './../../model/compte';
import { CompteInformationComponent } from './../../vue/compte-information/compte-information.component';
//import { CompteGestionComponent }from './../../vue/compte-gestion/compte-gestion.component';
import { EtatCompte } from './../../model/EtatCompte';
import { AppComponent } from './../../app.component';

@Component({
  selector: 'app-migraine-login',
  templateUrl: './Compte-login.component.html',
  styleUrls: ['./Compte-login.component.css'],
  //providers : []
})
//export class MigraineLoginComponent implements OnInit {
export class CompteLoginComponent implements OnInit{

  Nouveau : boolean = false;
  Congratulation : boolean = false; 
  compte:Compte = new Compte();

  constructor(private compteService : CompteService,
              private router:Router,
              private appComponent: AppComponent) {
   }

  ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    this.compteService.changeCompte(this.compte);
    console.log('login', this.compte);
  }

connexion(){
    let compteEnvois : Compte = new Compte();
    compteEnvois.Identifiant = this.compte.Identifiant;
    compteEnvois.MotDePass = this.compte.MotDePass;
    compteEnvois.Token = CompteService.CleBasic;

    this.compteService.changeCompte(compteEnvois);
    //this.compte = new Compte();
    //localStorage.setItem('compte', JSON.stringify(this.compte));
    //console.log('infor avant envois',localStorage.getItem('compte'));
    //this.compteService.Login(this.identifiant).subscribe(data =>{ this.compte = data.body; console.log('retour', data.body) });
    this.compteService.Login().subscribe(data => {
      this.compte = data.body;
      console.log('retour', data.body);
      if (data.body.Erreur == null) {   
        this.Congratulation = true;
        //localStorage.setItem('compte', JSON.stringify(data.body));
        //localStorage.setItem('EtatCompte', EtatCompte.affichage.toString());
        //CompteGestionComponent.EtatDuCompte = 'affichage';
        //this.router.navigate(['info', this.compte]);
        this.compteService.changeCompte(this.compte);
        this.appComponent.Actualisation();
        //this.router.navigate(['affichage']);
      }
    });
 


    


    //this.compteService.connexionTest1().subscribe(res => {console.log(res.body);});
    //this.CompteTest.Login(this.identifiant).subscribe(data => this.compte = data.body );
    //console.log('le résultat est : ', this.compte);
    //this.compteService.LoginMok(this).subscribe( data => {if (data) {console.log(data);} else {}});
    //this.compteService.LoginMok().subscribe( data => this.compte = data.body );
    //this.compteService.connexionTest().subscribe(res => {console.log(res);},err => {console.log("error occured");},() => {console.log("The POST observable is now completed.");});
    //this.compteService.connexionTest().subscribe(res => {console.log(res)});
    //this.compteService.connexionTest1().subscribe(res => {console.log(res);},err => {console.log("error occured");},() => {console.log("The POST observable is now completed.");});
    
    //this.CompteTest.addQuestion({"Test":"Petit Teste"}).subscribe(data => {if (data) {console.log('donnée : ', data);} else {}});
    //this.CompteTest.postExample({"Test":"Petit Teste"}).subscribe(data => {if (data) {console.log('donnée : ', data);} else {}});

    //this.CompteTest.getSimple().subscribe(data => {if (data) {console.log('donnée : ', data);} else {}});
    //this.CompteTest.GET().subscribe(data => {if (data) {console.log('donnée : ', data);} else {}});
    //this.compteService.Login(this);
    //this.compteService.connexionTest1();
    
}
VoirCompte()
{
  this.router.navigate(['affichage']);
}
Deconnexion(){
  localStorage.clear();
  this.Congratulation = false;
  this.compte = new Compte();
  this.compte.IDWeb = 0;
  this.compte.Identifiant = "";
  this.compte.MotDePass = "";
  this.compteService.changeCompte(this.compte);
  this.appComponent.Actualisation();

  this.router.navigate(['']);
}

NouveauCompte(){
  this.compte = this.compteService.LancementMok(); //on écrase le compte pour le remplir avec des informations générique pour ne pas laisser les champs vides

  console.log("après Moke");
  this.compteService.changeCompte(this.compte);
  console.log("envois sur nouveau");
  this.router.navigate(['nouveau']);
}

// connexion1(){
//   const req = this.http.get('http://jsonplaceholder.typicode.com/posts',{
//     "title":"foo",
//     "body":"bar",
//     "userId":1
//   })
// }

  
  // test1() : void{
  //   console.log('entrée');
  //   this.http.get("http://localhost/Service1.svc/hello")
  //   .map(reponse => this.message = reponse.text());
  // }

  // connexion(){
  //   const req = this.http.post('http://localhost/Service1.svc/Patient/login',{
  //     "Login":"Patient",
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

  // connexion1(){
  //   const req = this.http.post('http://jsonplaceholder.typicode.com/posts',{
  //     "title":"foo",
  //     "body":"bar",
  //     "userId":1
  //   })
  //   .subscribe(
  //     res => {
  //       console.log(res);
  //     },
  //     err => {
  //       console.log("error occured");
  //     }
  //   );
  // }

  // connexion2(){
  //   const req = this.http.post('http://localhost/Service1.svc/test', {
  //     "Test":"Petit Teste"
  //   })
  //   .subscribe(
  //     res => {
  //       console.log(res);
  //     },
  //     err => {
  //       console.log("erreur");
  //     }
  //   );
  // }

  // connexion3(){
  //   var json = {"Test":"Petit Teste"};
  //   var params = 'json='+json;
  //   var options = new Headers({'Content-Type':'application/json'});

  //   //this.http.post('http://localhost/Service1.svc/Post',params, options).subscribe()
    
  // }

  // connexion4(){
  //   //const body = {      username:'Patient',      Pass:'MonMotDePasse'    };
  //   const body = {};
  //   this.http.post('http://localhost:57928/Service1.svc/Patient/log?username=Patient', body, {params:new HttpParams().set('username', 'Patient')}).subscribe();
  //   //this.http.post('http://localhost:57928/Service1.svc/Patient/log?username=Patient', body).subscribe();
  // }
}  
