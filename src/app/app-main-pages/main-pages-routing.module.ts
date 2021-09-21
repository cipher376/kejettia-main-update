import { AuthGuard } from './../shared/services/guards/authGuard.service';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { RecentBrowsedComponent } from './recent-browsed/recent-browsed.component';
import { MapViewComponent } from './map-view/map-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompareComponent } from './compare/compare.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from '../ui-components/login/login.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { StoresComponent } from './stores/stores.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { LoaderFullComponent } from '../ui-components/loader-full/loader-full.component';
import { LoaderMiniComponent } from '../ui-components/loader-mini/loader-mini.component';
import { CartComponent } from './cart/cart.component';
import { CompanyComponent } from './company/company.component';
import { BusinessPageComponent } from './business-page/business-page.component';





const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  {
    path: 'pages',
    children: [
      {
        path: '', component: LayoutComponent,
        children: [
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
          },
          { path: 'home', component: HomeComponent },
          { path: 'auth/:page', component: AuthComponent },
          { path: 'contact', component: ContactComponent },
          { path: 'stores', component: StoresComponent },
          { path: 'search', component: SearchComponent },
          { path: 'login', component: LoginComponent },
          {
            canActivate: [AuthGuard],
            path: 'my-account', component: MyAccountComponent
          },
          { path: 'about', component: AboutUsComponent },
          { path: 'checkout', component: CheckoutComponent },
          { path: 'faq', component: FaqComponent },
          { path: 'contact', component: ContactComponent },
          { path: 'wishlist', component: WishlistComponent },
          { path: 'compare', component: CompareComponent },
          { path: 'my-account', component: MyAccountComponent },
          { path: 'error', component: ErrorPageComponent },
          { path: 'search', component: SearchComponent },
          { path: 'map', component: MapViewComponent },
          { path: 'recent-browsed', component: RecentBrowsedComponent },
          { path: 'order', component: OrderCompleteComponent },
          { path: 'cart', component: CartComponent },
          { path: 'loader-f', component: LoaderFullComponent },
          { path: 'loader-m', component: LoaderMiniComponent },
          { path: 'company', component: CompanyComponent },
          { path: 'change-password', component: ChangePasswordComponent },
          { path: 'verify-email', component: EmailVerificationComponent },
          { path: 'business-page', component: BusinessPageComponent }
        ]
      },

    ]
  },
  { path: '**', component: ErrorPageComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPagesRoutingModule { }
