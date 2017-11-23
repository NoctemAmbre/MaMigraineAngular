import { Injectable } from '@angular/core';
import { Compte } from './../../model/compte';

@Injectable()
export class JsonService {

  constructor() { }

  static JSONversCompte(json : string) : Compte {
    return <Compte>JSON.parse(json);
  }
}
