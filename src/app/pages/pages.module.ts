import { MapComponent } from './../shared/ui-components/map/map.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompareComponent } from './compare/compare.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account/my-account.component';
import { FaqComponent } from './faq/faq.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { MapViewComponent } from './map-view/map-view.component';
import { RecentBrowsedComponent } from './recent-browsed/recent-browsed.component';
import { MainComponent } from './main/main.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { StoresComponent } from './stores/stores.component';
import { AccountDetailsComponent } from '../shared/ui-components/account-details/account-details.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule,
    NgxPaginationModule,
  ],
  declarations: [
    MainComponent,
    AboutUsComponent,
    CartComponent,
    CheckoutComponent,
    CompareComponent,
    ContactComponent,
    ErrorPageComponent,
    FaqComponent,
    ForgetPasswordComponent,
    HomeComponent,
    LoginComponent,
    MapViewComponent,
    MyAccountComponent,
    RecentBrowsedComponent,
    SearchComponent,
    SignupComponent,
    WishlistComponent,
    MapComponent,
    StoresComponent,
    AccountDetailsComponent,
  ]
})
export class PagesModule { }
