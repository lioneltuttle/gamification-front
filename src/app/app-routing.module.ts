import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'accessdenied', redirectTo: '', pathMatch: 'full' },
  { path: 'badges',loadChildren: './pages/badges/badges.module#BadgesPageModule' },
  { path: 'resultat', loadChildren: './pages/resultat/resultat.module#ResultatPageModule' },
  { path: 'admin-points', loadChildren: './pages/admin-points/admin-points.module#AdminPointsPageModule' },
  { path: 'badges-master', loadChildren: './pages/badges-master/badges-master.module#BadgesMasterPageModule' },
  { path: 'badges-legend', loadChildren: './pages/badges-legend/badges-legend.module#BadgesLegendPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
