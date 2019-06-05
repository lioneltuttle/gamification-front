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
        console.log(data);
        
        let pa = data as [any];
        for (let audit of pa) {
          this.toastUp(audit);
        }

      }
    );
  }

  async toastUp(audit:any){
    console.log("toast p");
    
    let toast = await this.toastController.create({
      message: audit.value,
      duration: 2000
    });

    toast.onDidDismiss().then(() => {
      audit.seen = true;
      this.pointsAuditService.updatePointAudit(audit);
    });
    toast.present();
  }

  reloadBadges() {
    console.log("reload");

    this.badgesService.getBadges().subscribe(data => {
      console.log(data);
      this.badges = data as [Resultat];
    });
    this.displayNewBadges();
  }
}
