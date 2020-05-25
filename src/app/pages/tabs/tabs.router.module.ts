import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'badges',
        children: [
          {
            path: '',
            loadChildren: '../badges/badges.module#BadgesPageModule'
          }
        ]
      },
      {
        path: 'admin',
        children: [
          {
            path: '',
            loadChildren: '../admin-points/admin-points.module#AdminPointsPageModule'
          }
        ]
      },
      {
        path: 'recap',
        children: [
          {
            path: '',
            loadChildren: '../recap/recap.module#RecapPageModule'
          }
        ]
      },

      {
        path: 'recap-perso/:id',
        children: [
          {
            path: '',
            loadChildren: '../recap/recap.module#RecapPageModule'
          }
        ]
      },
      {
        path: 'resultat-mois',
        children: [
          {
            path: '',
            loadChildren: '../resultat-mois/resultat-mois.module#ResultatMoisPageModule'
          }
        ]
      },
      {
        path: 'resultat-semaine',
        children: [
          {
            path: '',
            loadChildren: '../resultat-semaine/resultat-semaine.module#ResultatSemainePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
      {
        path: 'history',
        children: [
          {
            path: '',
            loadChildren: '../history/history.module#HistoryPageModule'
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
