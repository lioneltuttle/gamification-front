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
      console.log(this.accountService.getUserId());
      
      return this.apiService.get('points-audits-for/' + this.accountService.getUserId());
    }
  }

  updatePointAudit(point:any){
    this.apiService.put('points-audits/', JSON.stringify( point), {
      headers: { 'Content-Type': 'application/json' }});
  }
}
