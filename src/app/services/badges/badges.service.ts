import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { AccountService } from '../auth/account.service';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BadgesService {

  constructor(private apiService: ApiService, private accountService: AccountService) { }

  getBadges(): Observable<any> {
    if(this.accountService.isAuthenticated ){
        return this.apiService.get('resultats/' + this.accountService.getUserId());
    }
  }

  OnInit() {
  }
}
