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
  tab:any[][];

  constructor(private adminPointsService: AdminPointsService, private userService: UserService, private badgesService:BadgesService) { }

  ngOnInit() {
    this.badges = Object.keys(BadgeType);
    this.userService.findAllUsers().pipe(
      concatMap(user => {
        this.users = user;
        return this.badgesService.getBadges(user.id);
      })
    ).subscribe(d => this.tab[d.userid][d]);
  }
}
