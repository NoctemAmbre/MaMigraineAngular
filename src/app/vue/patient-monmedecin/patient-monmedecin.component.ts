import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CompteService } from './../../service/compte/compte.service';
import { MedecinService } from './../../service/medecin/medecin.service';

import { Compte } from './../../model/compte';

declare var jquery:any;
declare var $ : any;

@Component({
  selector: 'app-patient-monmedecin',
  templateUrl: './patient-monmedecin.component.html',
  styleUrls: ['./patient-monmedecin.component.css']
})
export class PatientmonMedecinComponent implements OnInit {

  compte : Compte;
  Nomrecherche : string;
  ListMedecin : Compte[];
  medecin : Compte;

  constructor(private compteService:CompteService,
              private medecinService : MedecinService,
              private router:Router) {}

  ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    this.compteService.changeCompte(this.compte);

    this.medecinService.medecin.subscribe(res => this.medecin = res);
    this.medecinService.changeMedecin(this.medecin);

    if (this.compte.IDWeb == 0) this.router.navigate(['prospec']);

    console.log('modification', this.compte);
    // $(document).ready(function()
    // {
    //   alert('Jquery est activé')
    // });
    // $(function afficherPopupErreur()
    // {
    //   alert('Jquery est activé')
    // });

    //  $(function afficherPopupErreur(message) {
    //        $('body').append('<div id="popuperreur" title="Erreur"></div>');
    //        $("#popuperreur").html(message);
     
    //       var popup = $("#popuperreur").dialog({
    //           autoOpen: true,
    //           width: 400,      
    //           dialogClass: 'dialogstyleperso',
    //           buttons: [
    //               {      
    //                   text: "OK",
    //                   "class": 'ui-state-error',
    //                   click: function () {
    //                       $(this).dialog("close");
    //                       $('#popuperreur').remove();
    //                   }
    //               }
    //           ]
    //       });
    //       $("#popuperreur").prev().addClass('ui-state-error');
    //     });
      
    //       
    //   }
    // );
  }

  cacher(){
    this.compte.Erreur = "";
  }

  AjoutMedecin(compteAjouter : Compte) : void
  {
     this.ListMedecin = null;
     this.compte.MesMedecin = [];
     this.compte.MesMedecin.push(compteAjouter);
     console.log('Mes medecin à ajouter', this.compte);
     this.compteService.changeCompte(this.compte);
     this.compteService.AttributionMedecin().subscribe(data => {
        if (data.body != null)
        {
          this.compte = data.body;
          console.log('retour', data.body);
          this.compteService.changeCompte(this.compte);
        }
    });
  }

  SupprMedecin(compteASupprimer : Compte) : void
  {
     this.ListMedecin = null;
     this.compte.MesMedecin = [];
     this.compte.MesMedecin.push(compteASupprimer);
     console.log('Mes medecin à supprimer', this.compte);
     this.compteService.changeCompte(this.compte);
     this.compteService.SuppressionMedecin().subscribe(data => {
        if (data.body != null)
        {
          this.compte = data.body;
          console.log('retour', data.body);
          this.compteService.changeCompte(this.compte);
        }
    });
  }

  selectAffichage(compteAAfficher : Compte) : void
  {
    this.medecin = compteAAfficher;
    this.medecinService.changeMedecin(this.medecin);

    let CompteAEnvoyer : Compte = new Compte();
    CompteAEnvoyer.IDWeb = this.compte.IDWeb;
    CompteAEnvoyer.Token = this.compte.Token;
    CompteAEnvoyer.MesMedecin = [];
    CompteAEnvoyer.MesMedecin.push(this.medecin);

     this.medecinService.compte = CompteAEnvoyer;
     this.medecinService.InformationMedecin().subscribe(data => {
        this.medecin = data.body;
        this.medecinService.changeMedecin(this.medecin);
        console.log('retour', data.body);
        // this.compteService.changeCompte(this.compte);
    });
  }
  RechercherNouveauMedecin()
  {
      if (this.Nomrecherche != null && this.Nomrecherche.toString().length > 3 && this.medecinService.Entravail == false){
        let CompteEnvois : Compte = new Compte();
        CompteEnvois.Nom = this.Nomrecherche;
        CompteEnvois.Token = this.compte.Token;
        this.medecinService.compte = CompteEnvois;
        this.medecinService.ChercheMedecins().subscribe(data => {
          this.ListMedecin = data.body;
          this.medecinService.Entravail = false;
          console.log('retour', data.body);
          if (data.body.length > 0) {   
            console.log(data.body);
          }
      });
    }
  }
}
