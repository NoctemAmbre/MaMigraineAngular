import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

import { Cities } from './../../model/cities';
import { Reponse } from './../../model/reponse';

@Injectable()
export class CodepostalService {

  constructor(private http:HttpClient) { }

  chercheVille( NomVille:string) {  
   
    return this.http.get<Reponse>('https://vicopo.selfbuild.fr/ville/'+ NomVille + '?format=callback', {observe : 'response'});
  }
  chercheCP( CodePostal:number) {  
    console.log('jenvois : ', CodePostal.toString())
    return this.http.get<Reponse>('https://vicopo.selfbuild.fr/cherche/'+ CodePostal.toString(), {observe : 'response'});
  }

}
