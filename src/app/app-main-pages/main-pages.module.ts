import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompareComponent } from './compare/compare.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MainPagesRoutingModule } from './main-pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account/my-account.component';
import { FaqComponent } from './faq/faq.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { MapViewComponent } from './map-view/map-view.component';
import { RecentBrowsedComponent } from './recent-browsed/recent-browsed.component';
import { MainComponent } from './main/main.component';
import { StoresComponent } from './stores/stores.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentModule } from '../ui-components/component.module';
import { LayoutComponent } from './layout/layout.component';
import { AuthComponent } from './auth/auth.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { CompanyComponent } from './company/company.component';
import { CartComponent } from './cart/cart.component';
import { SelectModule } from 'ng-select';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { BusinessPageComponent } from './business-page/business-page.component';
import { TermsComponent } from './terms/terms.component';
import { TrackingComponent } from './tracking/tracking.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainPagesRoutingModule,
    NgxPaginationModule,
    ComponentModule,
    HttpClientModule,
    SelectModule,
  ],
  declarations: [
    MainComponent,
    AboutUsComponent,
    CheckoutComponent,
    CompareComponent,
    ContactComponent,
    ErrorPageComponent,
    FaqComponent,
    HomeComponent,
    MapViewComponent,
    MyAccountComponent,
    RecentBrowsedComponent,
    SearchComponent,
    WishlistComponent,
    StoresComponent,
    LayoutComponent,
    AuthComponent,
    OrderCompleteComponent,
    CartComponent,
    CompanyComponent,
    ChangePasswordComponent,
    EmailVerificationComponent,
    BusinessPageComponent,
    TermsComponent,
    TrackingComponent
  ],
})
export class MainPagesModule { }
