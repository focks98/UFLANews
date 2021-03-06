import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'details/:id', canActivate: [AuthGuard], loadChildren: './pages/news-detail/news-detail.module#NewsDetailPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'inicial', loadChildren: './pages/inicial/inicial.module#InicialPageModule' },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  { path: 'my-account', loadChildren: './pages/my-account/my-account.module#MyAccountPageModule' },
  { path: 'edit', loadChildren: './pages/edit/edit.module#EditPageModule' },
  { path: 'publishers/:id', loadChildren: './pages/publisher/publisher.module#PublisherPageModule' },
  //{ path: 'publisher', loadChildren: './pages/publisher/publisher.module#PublisherPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
