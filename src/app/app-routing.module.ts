import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { MainComponent } from './pages/main/main.component';
import { RouteGuardService } from './shared/services/route-guard.service';
=======
import { ContactComponent } from './components/pages/contact/contact.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';
import { StoresComponent } from './components/pages/stores/stores.component';
import { ProfileComponent } from './components/shared/ui-components/profile/profile.component';
import {ComingSoonComponent} from './components/pages/coming-soon/coming-soon.component';
import { ErrorPageComponent } from './components/pages/error-page/error-page.component';
>>>>>>> 3d2717d01347793d3e3e53587416a636644ef07d


<<<<<<< HEAD
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    canActivate: [RouteGuardService],
    path: '',
    component: MainComponent,
    children: [
      {
=======
{path: 'home', component: HomeComponent},
{path: 'contact', component: ContactComponent},
{path: 'stores', component: StoresComponent},
{path: 'login', component: LoginComponent},
{path: 'profile', component: ProfileComponent},
{path: 'my-account', component: MyAccountComponent},
{path: 'coming-soon', component: ComingSoonComponent},
{path: 'error-page', component: ErrorPageComponent},
>>>>>>> 3d2717d01347793d3e3e53587416a636644ef07d

       path: 'home',
       loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home/one'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
