import { Component, OnInit } from '@angular/core';
import { PointsAuditService } from 'src/app/services/points-audit/points-audit.service';
import { zip, of, from } from 'rxjs';
import { groupBy, mergeMap, toArray, switchMap } from 'rxjs/operators';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.css']
})
export class HistoryPage implements OnInit {
  pointsList: any[] = [];

  constructor(private pointsAuditService: PointsAuditService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //this.reloadPointHistory();
    this.activatedRoute.queryParams.subscribe(params => {
      var userId = params['id'];
      this.reloadPointHistoryU(userId);
    });
    
  }

  reloadPointHistory() {
    this.pointsAuditService.loadPointHistory()
      .pipe(
        switchMap(data => from(data)
          .pipe(
            groupBy((item: any) => item.date),
            mergeMap(group => zip(of(group.key), group.pipe(toArray()))))))
      .subscribe(d => this.pointsList.push(d));
  }

  reloadPointHistoryU(userid) {
    this.pointsAuditService.loadPointHistory(userid)
      .pipe(
        switchMap(data => from(data)
          .pipe(
            groupBy((item: any) => item.date),
            mergeMap(group => zip(of(group.key), group.pipe(toArray()))))))
      .subscribe(d => this.pointsList.push(d));
  }
}
