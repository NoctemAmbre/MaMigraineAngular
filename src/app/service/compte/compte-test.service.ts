import {Component, enableProdMode, Injectable, OnInit} from '@angular/core';
import {Http, Headers, URLSearchParams, RequestOptions, RequestOptionsArgs} from '@angular/http';
//import { Identifiant } from './../../metier/identifiant';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

const API_KEY = '6c759d320ea37acf99ec363f678f73c0:14:74192489';

@Injectable()
export class CompteTestService {

  constructor(private http: Http) { }

  seachArticle(query) {
    const endpoint = 'http://api.nytimes.com/svc/search/v2/articlesearch.json';
    const searchParams = new URLSearchParams()
    searchParams.set('api-key', API_KEY);
    searchParams.set('q', query);
    console.log('coucou');
    return this.http
      .get(endpoint, {search: searchParams})
      .map(res => {res.json().response.docs; console.log('test', res.json().response.docs);});
  }

  getSimple()
  {
    const endpoint = 'http://localhost:57928/Service1.svc/hello';
    const headers = new Headers();
    headers.set("Authorization", "123456789");
    let options = new RequestOptions({headers:headers});
    return this.http
    .get(endpoint, {headers})
    .map(res => res.json());
  }

  postExample(someData) {
    //var Val = { 'Test' : 'PetitTest'};
    //const endpoint = 'http://jsonplaceholder.typicode.com/posts';
    const endpoint = 'http://localhost:57928/Service1.svc/testSimple';
    //const headers = new Headers({'Content-Type': 'application/json'});
    //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let headers= new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json' });

    //let body = this.serializeObj(someData);
    //someData = {"Test":"Petit Teste"};
    return this.http
      .post(endpoint, JSON.stringify(someData), { headers: headers })
      .map(res  => res.json().data);
  }


  public addQuestion(data: any): Observable<Response>  {
    
        //const endpoint = 'http://jsonplaceholder.typicode.com/posts';
        const endpoint = 'http://localhost:57928/Service1.svc/test';
        let headersObj = new Headers({'Content-Type': 'application/json',
        'Accept': 'application/json' });
        //headersObj.set('Content-Type', 'application/x-www-form-urlencoded');
        //headersObj.set('Content-Type', 'application/json');
    
        let requestArg: RequestOptionsArgs = { headers: headersObj, method: "POST" };
    
        var params = new URLSearchParams();
        params.set("Test", "PetitTest");
        console.log( 'Params : ', params.toString());
    
        return this.http.post(endpoint , params.toString(), requestArg)
        .map(res => res.json());
    
      }

      public PostSimple()
      {
        let body = "&Test='Petit test'";
        //let body = JSON.stringify({Test:'Petit test'});
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        //headers.append('Authorization', `123456789`);
        let options = new RequestOptions({headers: headers});
        console.log(options);
          return this.http
        .post('http://localhost:57928/Service1.svc/test', body, options)
        .map(res => res.json());
      }

      public GET(){
        //let body = JSON.stringify({Login:'Noctem',Pass:'MonMotDePass'});
        //let body = "?Info=Information";
        //const headerDict = {'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Headers': 'Content-type','Authorization': '123456789',};
        const headerDict = {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'Authorization': 'Basic 123456789'};
        const headersObj = { headers: new Headers(headerDict),};

        //let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded' }).set('Authorization', `123456789`);
        //headers.append('Authorization', `123456789`);
        //let options = new RequestOptions({headers: headers});
        return this.http.get("http://localhost:57928/Service1.svc/get", headersObj).map(res => res.json());
      }


  private serializeObj(obj) {
    var result = [];
    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
}
export class Response{
  Test : string;
}


