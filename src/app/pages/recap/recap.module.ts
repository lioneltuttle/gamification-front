import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { IonicContextMenuModule } from 'ionic-context-menu';

import { RecapPage } from './recap.page';
import { UserRouteAccessService } from 'src/app/services/auth/user-route-access.service';


const routes: Routes = [
  {
    path: '',
    component: RecapPage,
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [UserRouteAccessService]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicContextMenuModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecapPage]
})
export class RecapPageModule {}
