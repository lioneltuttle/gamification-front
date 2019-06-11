import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AccountService } from 'src/app/services/auth/account.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Account } from 'src/model/account.model';
import { BadgesMgtService } from 'src/app/services/badgesMgt/badges-mgt.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  account: Account;
  nbBadgesMaster: [number];
  nbBadgesLegend: number[];
  nbBadgesPro: number;

  constructor(public navController: NavController, private accountService: AccountService,
     private loginService: LoginService, private badgeMgt: BadgesMgtService, private alertController: AlertController,
     private changeDetect:ChangeDetectorRef) { }

  ngOnInit() {
    this.accountService.identity().then(account => {
      if (account === null) {
        this.goBackToHomePage();
      } else {
        this.account = account;
      }
    });

    this.countBadgesMaster();
    this.countBadgesLegend();
    this.countBadgesPro();
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.goBackToHomePage();
  }

  private goBackToHomePage(): void {
    this.navController.navigateBack('');
  }

  private countBadgesLegend() {
    this.badgeMgt.getNbBadgesLegend().subscribe(
      d => this.nbBadgesLegend = Array(d).fill(new ArrayBuffer(8)).map((x, i) => i)
    );

  }

  private countBadgesMaster() {
    this.badgeMgt.getNbBadgesMaster().subscribe(
      d => this.nbBadgesMaster = Array(d).fill(0).map((x, i) => i) as [number]

    );
  }

  private countBadgesPro() {
    this.badgeMgt.getNbBadgesPro().subscribe(
      d => this.nbBadgesPro = d
    );
  }

  async presentProToMasterConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'sure',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.badgeMgt.exchangeForMaster();
            this.countBadgesPro();
            this.countBadgesMaster();
            this.changeDetect.detectChanges();
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
      header: 'Confirm!',
      message: 'Sur?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.badgeMgt.exchangeForLegend();
            this.countBadgesMaster();
            this.countBadgesLegend();
            this.changeDetect.detectChanges();
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
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.badgeMgt.exchangeForPresent();
            this.countBadgesLegend();
            this.changeDetect.detectChanges();
          }
        }
      ]
    });

    if (this.nbBadgesLegend.length >= 3) {
      await alert.present();
    }
  }
}
