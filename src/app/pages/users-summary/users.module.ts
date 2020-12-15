import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { UserRouteAccessService } from 'src/app/services/auth/user-route-access.service';

import { UsersSummary } from './users.page';


const routes: Routes = [
  {
    path: '',
    component: UsersSummary,
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [UserRouteAccessService]
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [UsersSummary]
})
export class UsersSummaryModule { }
