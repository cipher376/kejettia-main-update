import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompareComponent } from './compare/compare.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PagesRoutingModule } from './pages-routing.module';
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
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentModule } from '../ui-components/component.module';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    NgxPaginationModule,
    ComponentModule
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
    StoresComponent,
    LayoutComponent,

  ]
})
export class PagesModule { }
