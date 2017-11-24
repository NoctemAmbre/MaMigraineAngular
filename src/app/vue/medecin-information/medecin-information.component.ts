import { Component, OnInit } from '@angular/core';

import { MedecinService } from './../../service/medecin/medecin.service';

import { Compte } from './../../model/compte';

@Component({
  selector: 'app-medecin-information',
  templateUrl: './medecin-information.component.html',
  styleUrls: ['./medecin-information.component.css']
})
export class MedecinInformationComponent implements OnInit {

  medecin : Compte;

  constructor(private medecinService : MedecinService) { }

  ngOnInit() {
    this.medecinService.medecin.subscribe(res => this.medecin = res);
  }

}
