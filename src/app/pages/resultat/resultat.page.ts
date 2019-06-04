import { Component, OnInit, Input } from '@angular/core';
import { Resultat } from 'src/app/model/Resultat';



@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.page.html',
  styleUrls: ['./resultat.page.scss'],
})
export class ResultatPage implements OnInit {

  @Input() resultat:Resultat

  constructor() { 
    
  }

  ngOnInit() {
    
  }

}
