import { Injectable } from '@angular/core';
import { AccountService } from '../auth/account.service';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BadgesMgtService {

  constructor(private accountService: AccountService, private apiService: ApiService) { }

  getNbBadgesMaster():Observable<any> {
    if (this.accountService.isAuthenticated()) {
      return this.apiService.get('badge-masters/count/' + this.accountService.getUserId());
    }
  }

  getNbBadgesLegend():Observable<any> {
    if (this.accountService.isAuthenticated) {
      return this.apiService.get('badge-legends/count/' + this.accountService.getUserId());
    }
  }

  getNbBadgesPro():Observable<any> {
    if (this.accountService.isAuthenticated()) {
      return this.apiService.get('badge-pro/count/' + this.accountService.getUserId());
    }
  }

  exchangeForLegend() {
    if (this.accountService.isAuthenticated) {
      this.apiService.get('badge-masters/exchange/' + this.accountService.getUserId()).subscribe();
    }
  }

  exchangeForPresent() {
    if (this.accountService.isAuthenticated) {
      this.apiService.get('badge-legends/exchange/' + this.accountService.getUserId()).subscribe();
    }
  }

  exchangeForMaster() {
    if (this.accountService.isAuthenticated) {
      console.log("call exchange");
      
      this.apiService.get('badge-pro/exchange/' + this.accountService.getUserId()).subscribe(() => console.log("success")
       );
    }
  }
}
