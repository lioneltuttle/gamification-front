import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { Point } from 'src/app/model/Point';

@Injectable({
  providedIn: 'root'
})
export class AdminPointsService {

  constructor(private apiService:ApiService) { }

  saveAll(points:[Point]){
    this.apiService.post("pointsSave", points);
  }

  save(point:Point){
    
    this.apiService.post("points", JSON.stringify(point), {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(data => {}, error => console.log(error));
  }

  findLast2Weeks(userId:number):Observable<any>{
    return this.apiService.post("AllPoints", JSON.stringify( userId), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
