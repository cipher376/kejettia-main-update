import { StoreDetailsComponent } from './../shared/ui-components/store-details/store-details.component';
import { ProductComponent } from './../shared/ui-components/product/product.component';
import { RecentBrowsedComponent } from './recent-browsed/recent-browsed.component';
import { MapViewComponent } from './map-view/map-view.component';
import { MapComponent } from './../shared/ui-components/map/map.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompareComponent } from './compare/compare.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { StoresComponent } from './stores/stores.component';




const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'stores', component: StoresComponent },
      { path: 'search', component: SearchComponent },
      { path: 'login', component: LoginComponent },
      { path: 'my-account', component: MyAccountComponent },
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'compare', component: CompareComponent },
      { path: 'my-account', component: MyAccountComponent },
      { path: 'error', component: ErrorPageComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'search', component: SearchComponent },
      { path: 'map', component: MapViewComponent },
      { path: 'recent-browsed', component: RecentBrowsedComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
