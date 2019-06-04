import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { BadgesPage } from './badges.page';
import { UserRouteAccessService } from 'src/app/services/auth/user-route-access.service';

const routes: Routes = [
  {
    path: '',
    component: BadgesPage,
    data: {
      authorities: ['ROLE_USER']
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
  declarations: [BadgesPage]
})
export class BadgesPageModule {}
