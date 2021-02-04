import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private apiService: ApiService) { }

  sendPushNotification(datas: string[]) {
    this.apiService.post('notification', datas).subscribe(data => {},
      error => console.log(error));
  }


}
