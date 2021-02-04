import { ElementRef, ViewChild, Component, OnInit, OnChanges } from '@angular/core';
import { BadgesService } from 'src/app/services/badges/badges.service';
import { Resultat } from 'src/app/model/Resultat';
import { DomController,/* Gesture,  GestureController,*/ IonHeader, ToastController } from '@ionic/angular';
import { PointsAuditService } from 'src/app/services/points-audit/points-audit.service';

@Component({
  selector: 'app-badges',
  templateUrl: 'badges.page.html',
  styleUrls: ['badges.page.scss'],
})
export class BadgesPage implements OnInit {

  badges: [Resultat];
  @ViewChild(IonHeader, { read: ElementRef }) header: ElementRef;
  @ViewChild('paragraph') p: ElementRef;
  constructor(
   /* private gestureCtrl: GestureController,*/
    private domCtrl: DomController,private badgesService: BadgesService,
    /*events: Events,*/ 
    private pointsAuditService: PointsAuditService, public toastController: ToastController) {
    /*events.subscribe('badges Selected', () => this.reloadBadges());*/
  }

  ngOnInit() {
    this.reloadBadges();
    /*const gesture = this.gestureCtrl.create({
      el: this.header.nativeElement,
      gestureName: 'gesture',
      onMove: (detail) => { this.onMove(detail); }
    });
    gesture.enable();
  }*/
/* onMove(detail) {
    const type = detail.type;
    const currentX = detail.currentX;
    const deltaX = detail.deltaX;
    const velocityX = detail.velocityX;
    this.p.nativeElement.innerHTML = `
    <div>Type: ${type}</div>
    <div>Current X: ${currentX}</div>
    <div>Delta X: ${deltaX}</div>
    <div>Velocity X: ${velocityX}</div>
  `;*/
  }

  displayNewBadges() {
    this.pointsAuditService.getBadgesProUpdate().subscribe(
      data => {
        const pa = data as [any];
        for (const audit of pa) {
          this.toastUp(audit);
        }

      }
    );
  }

  async toastUp(audit: any) {
  /*  const toast = await this.toastController.create({
      message: audit.value,
      showCloseButton: true
    });
*/
    const toast = await this.toastController.create({
      header: audit.value,
      message: audit.value,
      position: 'top',
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();

    toast.onDidDismiss().then(() => {
      audit.seen = true;
      this.pointsAuditService.updatePointAudit(audit);
    });
    toast.present();
  }

  reloadBadges() {
    this.badgesService.getBadges().subscribe(data => {
      this.badges = data as [Resultat];
    });
    this.displayNewBadges();
  }
}
