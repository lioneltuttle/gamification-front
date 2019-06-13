import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TabsPage } from './tabs.page';
import { TabsPageRoutingModule } from './tabs.router.module';
import { HasRoleDirectiveDirective } from 'src/app/directives/has-role-directive.directive';


@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TabsPageRoutingModule, TranslateModule],
  declarations: [TabsPage, HasRoleDirectiveDirective]

})
export class TabsPageModule {}
