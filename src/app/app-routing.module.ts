import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/pages/contact/contact.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';
import { StoresComponent } from './components/pages/stores/stores.component';
import { ProfileComponent } from './components/shared/ui-components/profile/profile.component';
import {ComingSoonComponent} from './components/pages/coming-soon/coming-soon.component';

const routes: Routes = [
{
  path:'',
  redirectTo:'home',
  pathMatch: 'full'
},

{path: 'home', component: HomeComponent},
{path: 'contact', component: ContactComponent},
{path: 'stores', component: StoresComponent},
{path: 'login', component: LoginComponent},
{path: 'profile', component: ProfileComponent},
{path: 'my-account', component: MyAccountComponent},
{path: 'coming-soon', component: ComingSoonComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
