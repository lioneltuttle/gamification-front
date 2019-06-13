import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { AccountService } from 'src/app/services/auth/account.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  constructor(public events: Events,
    private accountService: AccountService) {
    
  }

  ngOnInit(){
    const tabBar = document.getElementById('tabadmin');
    this.accountService.hasAuthority("ROLE_ADMIN").then( 
      b => {if(!b)tabBar.style.display = 'none'} ); 
  }

  selectBadges(){
    this.events.publish("badges Selected");
  }
}
