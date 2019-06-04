import { Component, OnInit, OnChanges} from '@angular/core';
import { BadgesService } from 'src/app/services/badges/badges.service';
import { Resultat } from 'src/app/model/Resultat';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-badges',
  templateUrl: 'badges.page.html',
  styleUrls: ['badges.page.scss'],
})
export class BadgesPage  implements OnInit {

  badges:[Resultat];

  constructor(private badgesService:BadgesService, events:Events){
    events.subscribe("badges Selected", () => this.reloadBadges());
  }

  ngOnInit(){
    this.reloadBadges();
  }

  reloadBadges(){
    console.log("reload");
    
    this.badgesService.getBadges().toPromise().then(data => this.badges = data as [Resultat] );
  }
}
