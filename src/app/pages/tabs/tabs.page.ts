import { Component } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public events: Events) {
    
  }

  selectBadges(){
    console.log("publis to badges selected");
    this.events.publish("badges Selected");
  }
}
