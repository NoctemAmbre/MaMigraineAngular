import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Synthese } from '../../model/synthese';
import { Compte } from '../../model/compte';

@Injectable()
export class SyntheseService {

  private syntheses = new BehaviorSubject<Synthese>(new Synthese());
  synthese = this.syntheses.asObservable();

  constructor() { }

  changeSynthese(synthese){
    this.syntheses.next(synthese);
  }

 
}
