import { Component, OnInit, OnChanges } from '@angular/core';
import { BadgesService } from 'src/app/services/badges/badges.service';
import { Resultat } from 'src/app/model/Resultat';
import { Events, ToastController } from '@ionic/angular';
import { PointsAuditService } from 'src/app/services/points-audit/points-audit.service';

@Component({
  selector: 'app-badges',
  templateUrl: 'badges.page.html',
  styleUrls: ['badges.page.scss'],
})
export class BadgesPage implements OnInit {

  badges: [Resultat];

  constructor(private badgesService: BadgesService, events: Events, private pointsAuditService: PointsAuditService, public toastController: ToastController) {
    events.subscribe("badges Selected", () => this.reloadBadges());
  }

  ngOnInit() {
    this.reloadBadges();
  }

  displayNewBadges() {
    this.pointsAuditService.getBadgesProUpdate().subscribe(
      data => {        
        let pa = data as [any];
        for (let audit of pa) {
          this.toastUp(audit);
        }

      }
    );
  }

  async toastUp(audit:any){
    
    let toast = await this.toastController.create({
      message: audit.value,
      showCloseButton: true
    });

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
