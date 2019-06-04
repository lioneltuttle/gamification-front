import { Component, OnInit } from '@angular/core';
import { BadgesService } from 'src/app/services/badges/badges.service';
import { Resultat } from 'src/app/model/Resultat';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage implements OnInit{

  badges:[Resultat];

  constructor(private badgesService:BadgesService){
    
  }

  ngOnInit(){
    console.log('CA saoule3');
    this.badgesService.getBadges().subscribe(data => { console.log(data);
    this.badges = data as [Resultat]; });
  }

}
