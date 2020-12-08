import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import * as XLSX from 'xlsx';
import { Point } from 'src/app/model/Point';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private api: ApiService) { }

  postFile(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = reader.result;
      let workBook = XLSX.read(data, { type: 'binary', cellDates: true });

      let pointList = [];
      workBook.SheetNames.forEach(name => {
        const sheet = workBook.Sheets[name];
        let range = XLSX.utils.decode_range(sheet['!ref']);
        /*add one hour for sheetJS bug
            https://github.com/SheetJS/sheetjs/issues/1470
        */
        let date = moment(sheet['B1'].v).add(1, 'hour').toDate();
        var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

        let badgeType;

        for (let i = range.s.r + 1; i <= range.e.r; i++) {
          let rowNum = XLSX.utils.encode_row(i);
          let cell1 = sheet['A' + rowNum];
          let cell2 = sheet['B' + rowNum];
          if (typeof cell1 != 'undefined' && typeof cell2 === 'undefined') {
            badgeType = cell1.v;
          }
          else if (typeof cell1 != 'undefined' && typeof cell2 != 'undefined') {
            let p = new Point();
            p.userId = cell1.v;
            p.categorie = badgeType;
            p.nbPoints = cell2.v;
            p.date = utcDate;

            pointList.push(p);
          }
        }
      });
      this.api.post('pointsSave', JSON.stringify(pointList), {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe();
    }

    reader.readAsBinaryString(file);
  }

}
