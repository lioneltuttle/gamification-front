import { Component, OnInit } from '@angular/core';
import { PointsAuditService } from 'src/app/services/points-audit/points-audit.service';
import { zip, of, from } from 'rxjs';
import { groupBy, mergeMap, toArray, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.css']
})
export class HistoryPage implements OnInit {
  pointsList: any[] = [];

  constructor(private pointsAuditService: PointsAuditService) { }

  ngOnInit() {
    this.reloadPointHistory();
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
}
