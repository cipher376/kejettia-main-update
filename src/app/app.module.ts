import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { BlogComponent } from './components/blog/blog.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { CompareComponent } from './components/pages/compare/compare.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ErrorPageComponent } from './components/pages/error-page/error-page.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { ForgetPasswordComponent } from './components/pages/forget-password/forget-password.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MapViewComponent } from './components/pages/map-view/map-view.component';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { RecentBrowsedComponent } from './components/pages/recent-browsed/recent-browsed.component';
import { SearchComponent } from './components/pages/search/search.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { WishlistComponent } from './components/pages/wishlist/wishlist.component';
import { SharedComponent } from './components/shared/shared.component';
import { BannerPromotionComponent } from './components/shared/ui-components/banner-promotion/banner-promotion.component';
import { BannersComponent } from './components/shared/ui-components/banners/banners.component';
import { BlogSectionComponent } from './components/shared/ui-components/blog-section/blog-section.component';
import { BrandsComponent } from './components/shared/ui-components/brands/brands.component';
import { CategoriesComponent } from './components/shared/ui-components/categories/categories.component';
import { CategoriesMenuComponent } from './components/shared/ui-components/categories-menu/categories-menu.component';
import { CategoriesSectionComponent } from './components/shared/ui-components/categories-section/categories-section.component';
import { CategoryComponent } from './components/shared/ui-components/category/category.component';
import { FooterComponent } from './components/shared/ui-components/footer/footer.component';
import { HeaderComponent } from './components/shared/ui-components/header/header.component';
import { MainCarouelComponent } from './components/shared/ui-components/main-carouel/main-carouel.component';
import { MapComponent } from './components/shared/ui-components/map/map.component';
import { PopularStoresComponent } from './components/shared/ui-components/popular-stores/popular-stores.component';
import { PriceComponent } from './components/shared/ui-components/price/price.component';
import { ProductComponent } from './components/shared/ui-components/product/product.component';
import { SidebarComponent } from './components/shared/ui-components/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/shared/ui-components/sidebar/sidebar-item/sidebar-item.component';
import { StoreComponent } from './components/shared/ui-components/store/store.component';
import { StoreCarouselComponent } from './components/shared/ui-components/store-carousel/store-carousel.component';
import { StoreDetailsComponent } from './components/shared/ui-components/store-details/store-details.component';
import { DialogComponent } from './components/shared/ui-components/dialog/dialog.component';
import { MobileMenuComponent } from './components/shared/ui-components/mobile-menu/mobile-menu.component';
import { StickyFooterComponent } from './components/shared/ui-components/sticky-footer/sticky-footer.component';
import { InstagramComponent } from './components/shared/ui-components/instagram/instagram.component';
import { PopularCategoriesComponent } from './components/shared/ui-components/popular-categories/popular-categories.component';
import { BestSellersComponent } from './components/shared/ui-components/best-sellers/best-sellers.component';
import { SignupBannerComponent } from './components/shared/ui-components/signup-banner/signup-banner.component';
import { TaglineWidgetComponent } from './components/shared/ui-components/tagline-widget/tagline-widget.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BlogComponent,
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
    ProfileComponent,
    RecentBrowsedComponent,
    SearchComponent,
    SignupComponent,
    WishlistComponent,
    SharedComponent,
    BannerPromotionComponent,
    BannersComponent,
    BlogSectionComponent,
    BrandsComponent,
    CategoriesComponent,
    CategoriesMenuComponent,
    CategoriesSectionComponent,
    CategoryComponent,
    FooterComponent,
    HeaderComponent,
    MainCarouelComponent,
    MapComponent,
    PopularStoresComponent,
    PriceComponent,
    ProductComponent,
    SidebarComponent,
    SidebarItemComponent,
    StoreComponent,
    StoreCarouselComponent,
    StoreDetailsComponent,
    DialogComponent,
    MobileMenuComponent,
    StickyFooterComponent,
    InstagramComponent,
    PopularCategoriesComponent,
    BestSellersComponent,
    SignupBannerComponent,
    TaglineWidgetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
