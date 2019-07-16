import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { AccountService } from 'src/app/services/auth/account.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  tabAdmin: any;
  tabrecap: any;
  constructor(public events: Events,
    private accountService: AccountService) {
     
  }

  ngOnInit(){
    this.tabAdmin = document.getElementById('tabadmin');
    this.tabrecap = document.getElementById('tabrecap');
  }

  ionViewWillEnter() {
    this.accountService.hasAuthority("ROLE_ADMIN").then( 
      b => {
        if(!b){
          this.tabAdmin.style.display = 'none';
          this.tabrecap.style.display = 'none';
        }
      } ); 
  }

  selectBadges(){
    this.events.publish("badges Selected");
  }
}
