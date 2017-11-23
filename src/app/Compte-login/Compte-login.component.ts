import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'

@Component({
  selector: 'app-migraine-login',
  templateUrl: './Compte-login.component.html',
  styleUrls: ['./Compte-login.component.css']
})
//export class MigraineLoginComponent implements OnInit {
export class MigraineLoginComponent implements OnInit{
  
  titre = 'Menu de connexion';
  Utilisateur:utilisateur= {id:1,nom:'Noctem',motdepass:'Motdepass'};

  constructor(private http:HttpClient) { }

  ngOnInit() {
    //this.connexion2();
  }

  connexion(){
    const req = this.http.post('http://localhost/Service1.svc/Patient/login',{
      "Login":"Patient",
      "Pass":"MonMotDePasse"
    },)
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("error occured");
      }
    );
  }

  connexion1(){
    const req = this.http.post('http://jsonplaceholder.typicode.com/posts',{
      "title":"foo",
      "body":"bar",
      "userId":1
    })
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("error occured");
      }
    );
  }

  connexion2(){
    const req = this.http.post('http://localhost/Service1.svc/test', {
      "Test":"Petit Teste"
    })
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("erreur");
      }
    );
  }

  connexion3(){
    var json = {"Test":"Petit Teste"};
    var params = 'json='+json;
    var options = new Headers({'Content-Type':'application/json'});

    //this.http.post('http://localhost/Service1.svc/Post',params, options).subscribe()
    
  }

  connexion4(){
    //const body = {      username:'Patient',      Pass:'MonMotDePasse'    };
    const body = {};
    this.http.post('http://localhost:57928/Service1.svc/Patient/log?username=Patient', body, {params:new HttpParams().set('username', 'Patient')}).subscribe();
    //this.http.post('http://localhost:57928/Service1.svc/Patient/log?username=Patient', body).subscribe();
  }


}

export class utilisateur{
  id:number;
  nom:string;
  motdepass:string;
}