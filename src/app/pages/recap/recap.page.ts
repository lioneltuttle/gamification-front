import { Component, OnInit } from '@angular/core';
import { BadgeType } from 'src/app/model/Resultat';
import { AdminPointsService } from 'src/app/services/admin-points/admin-points.service';
import { UserService } from 'src/app/services/user/user.service';
import { concatMap } from 'rxjs/operators';
import { BadgesService } from 'src/app/services/badges/badges.service';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.page.html',
  styleUrls: ['./recap.page.scss'],
})
export class RecapPage implements OnInit {

  badges: Array<string>;
  users: any[];
  tab:any[];

  constructor(private adminPointsService: AdminPointsService, private userService: UserService, private badgesService:BadgesService) { }

  ngOnInit() {
    this.badges = Object.keys(BadgeType);
    this.badgesService.getFullRecap().subscribe( 
      data => {console.log(data); this.tab = data;
        console.log(this.tab[0].badgesPro);
        console.log(this.tab[0].badgesPro['R2']);
      } 
      );
    
  }

  setAdmin(userId) {
    this.userService.setAdmin(userId).subscribe(
      data => {
        location.reload() ;
      }
    );
  }

  displayValueOrZero(tableau , col){
    if(typeof tableau[col] !== "undefined"){ 
      return tableau[col] ;
    } else {
      return '0';
    }
  }
}
