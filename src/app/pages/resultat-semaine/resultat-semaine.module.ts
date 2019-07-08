import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResultatSemainePage } from './resultat-semaine.page';

const routes: Routes = [
  {
    path: '',
    component: ResultatSemainePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResultatSemainePage]
})
export class ResultatSemainePageModule {}
