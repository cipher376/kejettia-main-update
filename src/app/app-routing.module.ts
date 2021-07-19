import { ErrorPageComponent } from './app-main-pages/error-page/error-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    canActivate: [],
    path: '',
    children: [
      // {
      //  path: 'home',
      //  loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
      // },
      {
        path: 'main',
        loadChildren: () => import('./app-main-pages/main-pages.module').then(m => m.MainPagesModule)
      },
      {
        path: 'stores',
        loadChildren: () => import('./app-store-pages/store-pages.module').then(m => m.StorePagesModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'main/pages/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
