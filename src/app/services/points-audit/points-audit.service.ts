import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { AccountService } from '../auth/account.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointsAuditService {

  constructor(private apiService: ApiService, private accountService: AccountService) { }

  getBadgesProUpdate(): Observable<any> {
    if (this.accountService.isAuthenticated) {
         return this.apiService.get('points-audits-for/badge-pro/' + this.accountService.getUserId());
    }
  }

  updatePointAudit(point:any){
    
    this.apiService.put('points-audits/', JSON.stringify( point), {
      headers: { 'Content-Type': 'application/json' }}).subscribe( );
  }

  loadPointHistory(userId?: Number, begin?: Date, end?: Date): Observable<any> {
    let id;
    if (userId) {
      id = userId;
    } else if (this.accountService.isAuthenticated) {
      id = this.accountService.getUserId();
    }
    let beginDate = begin ? begin : new Date(0);
    let endDate = end ? end : new Date();

    let params = { userId: id, begin: beginDate.toISOString(), end: endDate.toISOString() }
    return this.apiService.get('pointsByPeriod', params);
  }
}
