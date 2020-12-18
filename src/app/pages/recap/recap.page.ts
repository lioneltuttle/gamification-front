import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BadgeType } from 'src/app/model/Resultat';
import { AdminPointsService } from 'src/app/services/admin-points/admin-points.service';
import { UserService } from 'src/app/services/user/user.service';
import { concatMap } from 'rxjs/operators';
import { BadgesService } from 'src/app/services/badges/badges.service';
import { AlertController } from '@ionic/angular';
import { Point } from 'src/app/model/Point';
import { PointsAuditService } from 'src/app/services/points-audit/points-audit.service';
import { zip, of, from } from 'rxjs';
import { groupBy, mergeMap, toArray, switchMap } from 'rxjs/operators';
import { UploadFileService } from 'src/app/services/uploadFile/uploadFile.service';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
// import { FCM } from '@ionic-native/fcm';


@Component({
  selector: 'app-recap',
  templateUrl: './recap.page.html',
  styleUrls: ['./recap.page.scss'],
})
export class RecapPage implements OnInit {

  badges: Array<string>;
  users: any[];
  tab: any[];
  inactive: any[];
  admins: any[];
  pointsList: any[] = [];
  @ViewChild('fileInput')
  myInputVariable: ElementRef;

  constructor(
    private adminPointsService: AdminPointsService,
    private userService: UserService,
    private badgesService: BadgesService,
    public atrCtrl: AlertController,
    private pointsAuditService: PointsAuditService,
    private uploadFileService: UploadFileService,
    private push: Push// ,
    // private fcm: FCM
   ) { }

  ngOnInit() {
    this.badges = Object.keys(BadgeType);
    this.badgesService.getFullRecap().subscribe(
      data => {
        console.log(data); this.tab = data;
        console.log(this.tab[0].badgesPro);
        // tslint:disable-next-line:no-string-literal
        console.log(this.tab[0].badgesPro['R2']);
      }
    );


    this.badgesService.getInactiveRecap().subscribe(
      data => {
        console.log(data); this.inactive = data;
        console.log(this.tab[0].badgesPro);
        // tslint:disable-next-line:no-string-literal
        console.log(this.tab[0].badgesPro['R2']);
      }
    );

    this.badgesService.getAdminRecap().subscribe(
      data => {
        console.log(data); this.admins = data;
        console.log(this.tab[0].badgesPro);
        // tslint:disable-next-line:no-string-literal
        console.log(this.tab[0].badgesPro['R2']);
      }
    );

  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  importExcel(files: FileList) {
    this.uploadFileService.postFile(files.item(0));
    // reset file input
    this.myInputVariable.nativeElement.value = '';
  }

  openFile() {
    this.myInputVariable.nativeElement.click();
  }

  reloadPointHistory(userid) {
    this.pointsAuditService.loadPointHistory(userid)
      /*.pipe(
        switchMap(data => from(data)
          .pipe(
            groupBy((item: any) => item.date),
            mergeMap(group => zip(of(group.key), group.pipe(toArray()))))))
     // .toPromise().then(
       // d => this.pointsList.push(d)
        //)*/
      // .subscribe(d => this.pointsList = d);

      .subscribe(d => this.pointsList.push(d));
  }

  setAdmin(userId) {
    this.userService.setAdmin(userId).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  removeUserRole(userId) {
    this.userService.removeUserRole(userId).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  deleteUser(login) {
    this.userService.deleteUser(login).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }



  addUserRole(userId) {
    this.userService.addUserRole(userId).subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  async showPromptAlert(userid, badgetype, coef) {
    const alert = this.atrCtrl.create({
      message: badgetype,
      inputs: [
        {
          type: 'number',
          name: 'points',
          placeholder: 'Enter Points'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('You Clicked on Cancel');
          }
        },
        {
          text: 'OK',
          handler: data => {

            let badgeTypeVar = badgetype;
            switch (badgetype) {
              case 'ECOLE FR': badgeTypeVar = 'ECOLE_FR'; break;
              case 'DEMARRAGE SANS IC': badgeTypeVar = ' DEMARRAGE_SANS_IC'; break;
              case 'DEMARRAGE SOUS 2 SEMAINES': badgeTypeVar = 'DEMARRAGE_2_SEMAINES'; break;

            }
            const po = new Point();
            po.date = new Date();
            po.categorie = badgeTypeVar;
            po.userId = userid;
            po.nbPoints = data.points * coef;
            this.adminPointsService.save(po);
            console.log('Points added : ' + data.points);
            this.addUserRole(userid);

          }
        }
      ]
    });
    (await alert).present();
  }

  displayValueOrZero(tableau, col) {
    if (typeof tableau[col] !== 'undefined') {
      return tableau[col];
    } else {
      return '0';
    }
  }
}
