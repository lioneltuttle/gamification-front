import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminPointsPage } from './admin-points.page';
import { UserService } from 'src/app/services/user/user.service';
import { UserRouteAccessService } from 'src/app/services/auth/user-route-access.service';


const routes: Routes = [
  {
    path: '',
    component: AdminPointsPage,
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
    RouterModule.forChild(routes)
  ],
  providers: [UserService],
  declarations: [AdminPointsPage]
})
export class AdminPointsPageModule {}
