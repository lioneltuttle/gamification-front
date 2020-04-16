import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminPointsService } from 'src/app/services/admin-points/admin-points.service';
import { Point } from 'src/app/model/Point';
import { UserService } from 'src/app/services/user/user.service';
import { BadgeType } from 'src/app/model/Resultat';
import { UploadFileService } from 'src/app/services/uploadFile/uploadFile.service';

@Component({
  selector: 'app-admin-points',
  templateUrl: './admin-points.page.html',
  styleUrls: ['./admin-points.page.scss'],
})
export class AdminPointsPage implements OnInit {

  users: [any];
  point: Point = new Point();
  badges: Array<string>;
  
  @ViewChild('fileInput')
  myInputVariable: ElementRef;
  constructor(private adminPointsService: AdminPointsService, private userService: UserService, private uploadFileService:UploadFileService) { }

  ngOnInit() {
    this.badges = this.keys();
    this.userService.findAllUsers().subscribe(d => this.users = d);
  }

  keys(): Array<string> {
    return Object.keys(BadgeType);
  }

  save() {
    this.point.date = this.getLastFriday();
    this.adminPointsService.save(this.point);
  }

  getLastFriday(): Date {
    var d = new Date(),
      day = d.getDay(),
      diff = (day <= 5) ? (7 - 5 + day) : (day - 5);

    d.setDate(d.getDate() - diff);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);

    return d;
  }

  openFile(){
    this.myInputVariable.nativeElement.click();
  }

  importExcel(files:FileList){
    this.uploadFileService.postFile(files.item(0));
    //reset file input
    this.myInputVariable.nativeElement.value = "";
  }
}
