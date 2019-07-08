import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    private events: Events,
    private cdr: ChangeDetectorRef) {
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
            this.reloadPage();
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
            this.reloadPage();
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
            this.reloadPage();
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
        this.nbBadgesMaster = Array(master).map((x, i) => 0) ;
        this.nbBadgesLegend = Array(legend).map((x, i) => 0) ;
        this.cdr.markForCheck();
      }
    )
  }
}
