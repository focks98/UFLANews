import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard], 
    children: [
      {
        path: 'news',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/news/news.module').then(m => m.NewsPageModule)
          }
        ]
      },
      {
        path: 'favorites',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/favorites/favorites.module').then(m => m.FavoritesPageModule)
          }
        ]
      },
      {
        path: 'more',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/more/more.module').then(m => m.MorePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/news',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/news',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
