import { Component, OnInit } from '@angular/core';
import { PointsAuditService } from 'src/app/services/points-audit/points-audit.service';
import { zip, of, from } from 'rxjs';
import { groupBy, mergeMap, toArray, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-usersSummary',
  templateUrl: 'users.page.html',
  styleUrls: ['users.page.css']
})
export class UsersSummary implements OnInit {
  pointsList: any[] = [];

  constructor(private pointsAuditService: PointsAuditService) { }

  ngOnInit() {
    this.reloadUsersSummary();
  }

  reloadUsersSummary() {
    this.pointsAuditService.loadUserSummary()
      .pipe(
        switchMap(data => from(data)
          .pipe(
            groupBy((item: any) => item.date),
            mergeMap(group => zip(of(group.key), group.pipe(toArray()))))))
      .subscribe(d => this.pointsList.push(d));
  }
}
