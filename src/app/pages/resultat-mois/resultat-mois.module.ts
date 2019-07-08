import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResultatMoisPage } from './resultat-mois.page';

const routes: Routes = [
  {
    path: '',
    component: ResultatMoisPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResultatMoisPage]
})
export class ResultatMoisPageModule {}
