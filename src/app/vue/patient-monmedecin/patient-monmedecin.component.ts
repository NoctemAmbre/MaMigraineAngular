import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

import { CompteService } from './../../service/compte/compte.service';
import { MedecinService } from './../../service/medecin/medecin.service';
import { PatientService } from './../../service/patient/patient.service';

import { Observable } from 'rxjs/Observable';

import { Compte } from './../../model/compte';
import { Facteur } from '../../model/facteur';
import { Medicament } from '../../model/medicament';

declare var jquery:any;
declare var $ : any;

@Component({
  selector: 'app-patient-monmedecin',
  templateUrl: './patient-monmedecin.component.html',
  styleUrls: ['./patient-monmedecin.component.css']
})
export class PatientmonMedecinComponent implements OnInit {

  compte : Compte;
  patient : Compte;
  Nomrecherche : string;
  ListMedecin : Compte[];
  medecin : Compte;

  dataSource = new MatTableDataSource<Compte>(this.ListMedecin);

  constructor(private compteService:CompteService,
              private medecinService : MedecinService,
              private patientService : PatientService,
              private router:Router) {}

  displayedColumns = ['Nom', 'Prénom', 'Ajouter'];

  ngOnInit() {
    this.compteService.compte.subscribe(res => this.compte = res);
    this.compteService.changeCompte(this.compte);

    this.patientService.patient.subscribe(res => this.patient = res);
    //this.patientService.changePatient(this.patient);
    if (this.compte.IDWeb == 0) this.router.navigate(['prospec']);
    if (this.compte.Type == 2){ //si cette page est lancé directement par un patient 
      this.patient = this.compte;
    }

    this.medecinService.medecin.subscribe(res => this.medecin = res);
    this.medecinService.changeMedecin(this.medecin);
   

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
    let CompteEnvois = new Compte();
    CompteEnvois.IDWeb = compteAjouter.IDWeb;
    CompteEnvois.Identifiant = compteAjouter.Identifiant;
     //this.compteService.changeCompte(this.compte);
     this.compteService.Medecin = CompteEnvois;
     this.compteService.AttributionMedecin().subscribe(data => {
        if (data.body != null)
        {
          this.patient = data.body;
          console.log('retour mes médecins', data.body);
          this.patient.TableFacteur = new MatTableDataSource<Facteur>(this.patient.MesFacteurs);
          this.patient.TableMedicament = new MatTableDataSource<Medicament>(this.patient.MesMedicaments);
          this.patientService.changePatient(this.patient);
          this.compteService.changeCompte(this.patient);
          this.Nomrecherche = null;
          this.ListMedecin =  null;
        }
    });
  }

  ValiderNouveauMedecin(MedecinAValider : Compte) : void{
    let CompteEnvois = new Compte();
    CompteEnvois.IDWeb = MedecinAValider.IDWeb;
    CompteEnvois.Identifiant = MedecinAValider.Identifiant;
    this.compteService.Medecin = CompteEnvois;

    console.log('Mes medecin à valider', this.compte);
    //this.compteService.changeCompte(this.compte);
    this.compteService.ValidationMedecin().subscribe(data => {
       if (data.body != null)
       {
         this.patient = data.body;
         console.log('retour', data.body);
         this.patient.TableFacteur = new MatTableDataSource<Facteur>(this.patient.MesFacteurs);
         this.patient.TableMedicament = new MatTableDataSource<Medicament>(this.patient.MesMedicaments);
         this.compteService.changeCompte(this.patient);
         this.patientService.changePatient(this.patient);
       }
   });
  }

  SupprMedecin(compteASupprimer : Compte) : void
  {
    let CompteEnvois = new Compte();
    CompteEnvois.IDWeb = compteASupprimer.IDWeb;
    CompteEnvois.Identifiant = compteASupprimer.Identifiant;
     
    this.compteService.Medecin = compteASupprimer;
    //this.compteService.changeCompte(this.compte);
    this.compteService.SuppressionMedecin().subscribe(data => {
      if (data.body != null)
      {
        this.patient = data.body;
        console.log('retour', data.body);
        this.patient.TableFacteur = new MatTableDataSource<Facteur>(this.patient.MesFacteurs);
        this.patient.TableMedicament = new MatTableDataSource<Medicament>(this.patient.MesMedicaments);
        this.patientService.changePatient(this.patient);
        this.compteService.changeCompte(this.patient);
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
    console.log('je tappe', this.Nomrecherche);
      if (this.Nomrecherche != null && this.Nomrecherche.toString().length > 2 && this.medecinService.Entravail == false){
        console.log('je cherche', this.Nomrecherche);
        let CompteEnvois : Compte = new Compte();
        CompteEnvois.Nom = this.Nomrecherche;
        CompteEnvois.Token = this.compte.Token;
        this.medecinService.compte = CompteEnvois;
        this.medecinService.ChercheMedecins().subscribe(data => {
          if (data.body.length > 0) this.ListMedecin = data.body;
          else this.ListMedecin = null;
          this.dataSource = new MatTableDataSource<Compte>(this.ListMedecin);
          this.medecinService.Entravail = false;
          console.log('je trouve', data.body);
          if (data.body.length > 0) {   
            console.log(data.body);
          }
      });
    }else this.ListMedecin = null;
  }
}
