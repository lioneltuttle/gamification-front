import { Component, OnInit } from '@angular/core';
import { AlertController, Events } from '@ionic/angular';
import { AccountService } from 'src/app/services/auth/account.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Account } from 'src/model/account.model';
import { BadgesMgtService } from 'src/app/services/badgesMgt/badges-mgt.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  account: Account;
  nbBadgesMaster: number[];
  nbBadgesLegend: number[];
  nbBadgesPro: number;

  constructor(public router: Router, private accountService: AccountService,
    private loginService: LoginService,
    private badgeMgt: BadgesMgtService,
    private alertController: AlertController,
    private events: Events) {
    events.subscribe("reload home", () => this.reloadPage());
  }

  ngOnInit() {
    this.accountService.identity().then(account => {
      if (account === null) {
        this.goBackToHomePage();
      } else {
        this.account = account;
      }
    });

    this.reloadPage();
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.goBackToHomePage();
  }

  private goBackToHomePage(): void {
    this.router.navigateByUrl('');
  }

  async presentProToMasterConfirm() {
    const alert = await this.alertController.create({
      message: 'Echanger 3 badges pro contre 1 master',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: () => {
            this.badgeMgt.exchangeForMaster().subscribe(() => this.events.publish("reload home"));
          }
        }
      ]
    });
    if (this.nbBadgesPro >= 3) {
      await alert.present();
    }
  }

  async presentMasterToLegendConfirm() {
    const alert = await this.alertController.create({
      message: 'Echanger 2 badges master contre 1 legend?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: () => {
            this.badgeMgt.exchangeForLegend().subscribe(() => this.events.publish("reload home"));
          }
        }
      ]
    });

    if (this.nbBadgesMaster.length >= 2) {
      await alert.present();
    }
  }

  async presentLegendToPresentConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'T sure que tu veux ton cadeau??',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: () => {
            this.badgeMgt.exchangeForPresent().subscribe(() => this.events.publish("reload home"));
          }
        }
      ]
    });

    if (this.nbBadgesLegend.length >= 3) {
      await alert.present();
    }
  }

  ionViewWillEnter() {
    this.reloadPage();
  }

  reloadPage() {
    forkJoin(
      this.badgeMgt.getNbBadgesPro(),
      this.badgeMgt.getNbBadgesMaster(),
      this.badgeMgt.getNbBadgesLegend()
    ).subscribe(
      ([pro, master, legend]) => {
        this.nbBadgesPro = pro;
        this.nbBadgesMaster = Array(master).fill(0).map((x, i) => i) ;
        this.nbBadgesLegend = Array(legend).fill(0).map((x, i) => i) ;
      }
    )
  }
}
