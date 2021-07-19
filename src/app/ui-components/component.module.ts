import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { BrowserModule } from '@angular/platform-browser';

import { TaglineWidgetComponent } from './tagline-widget/tagline-widget.component';
import { StoreItemComponent } from './store-item/store-item.component';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { StoreCarouselComponent } from './store-carousel/store-carousel.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AddressComponent } from './address/address.component';
import { BannerPromotionComponent } from './banner-promotion/banner-promotion.component';
import { BannersComponent } from './banners/banners.component';
import { BestSellerItemComponent } from './best-seller-item/best-seller-item.component';
import { BestSellersComponent } from './best-sellers/best-sellers.component';
import { BlogSectionComponent } from './blog-section/blog-section.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesMenuItemComponent } from './categories-menu/categories-menu-item/categories-menu-item.component';
import { CategoriesMenuComponent } from './categories-menu/categories-menu.component';
import { CategoriesSectionComponent } from './categories-section/categories-section.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { DialogComponent } from './dialog/dialog.component';
import { FooterComponent } from './footer/footer.component';
import { InstagramComponent } from './instagram/instagram.component';
import { IntroBannerOneComponent } from './intro-banner-one/intro-banner-one.component';
import { IntroBannerThreeComponent } from './intro-banner-three/intro-banner-three.component';
import { IntroBannerTwoComponent } from './intro-banner-two/intro-banner-two.component';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { MapComponent } from './map/map.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { NewsletterPopupComponent } from './newsletter-popup/newsletter-popup.component';
import { OrdersComponent } from './orders/orders.component';
import { OtherCategoriesComponent } from './other-categories/other-categories.component';
import { PopularCategoriesItemComponent } from './popular-categories-item/popular-categories-item.component';
import { PopularCategoriesComponent } from './popular-categories/popular-categories.component';
import { PopularStoresComponent } from './popular-stores/popular-stores.component';
import { PriceComponent } from './price/price.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SignupBannerComponent } from './signup-banner/signup-banner.component';
import { StickyFooterComponent } from './sticky-footer/sticky-footer.component';
import { CategoriesMenuItemSectionComponent } from './categories-menu/categories-menu-item-section/categories-menu-item-section.component';
import { CategoriesMenuItemSectionBannerComponent } from './categories-menu/categories-menu-item-section-banner/categories-menu-item-section-banner.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SearchInputComponent } from './search-input/search-input.component';
import { ItemThumbnailComponent } from './item-thumbnail/item-thumbnail.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { StoreSearchComponent } from './store-search/store-search.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { CompanySearchComponent } from './company-search/company-search.component';
import { PublicServiceSearchComponent } from './public-service-search/public-service-search.component';
import { StoreFilterComponent } from './store-filter/store-filter.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { CompanyFilterComponent } from './company-filter/company-filter.component';
import { SearchNavComponent } from './search-nav/search-nav.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RatingComponent } from './rating/rating.component';



@NgModule({
  declarations: [
    AccountDetailsComponent,
    AddressComponent,
    BannerPromotionComponent,
    BannersComponent,
    BestSellerItemComponent,
    BestSellersComponent,
    BlogSectionComponent,
    BrandsComponent,
    CategoriesComponent,
    CategoriesMenuComponent,
    CategoriesMenuItemComponent,
    CategoriesSectionComponent,
    CategoryComponent,
    DialogComponent,
    FooterComponent,
    HeaderComponent,
    InstagramComponent,
    IntroBannerOneComponent,
    IntroBannerTwoComponent,
    IntroBannerThreeComponent,
    MainCarouselComponent,
    MapComponent,
    MobileMenuComponent,
    NewsletterPopupComponent,
    OrdersComponent,
    OtherCategoriesComponent,
    PopularCategoriesComponent,
    PopularCategoriesItemComponent,
    PopularStoresComponent,
    PriceComponent,
    ProductComponent,
    ProfileComponent,
    SidebarComponent,
    SignupBannerComponent,
    StickyFooterComponent,
    StoreCarouselComponent,
    StoreDetailsComponent,
    StoreItemComponent,
    TaglineWidgetComponent,
    CategoriesMenuItemSectionComponent,
    CategoriesMenuItemSectionBannerComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    SearchInputComponent,
    ItemThumbnailComponent,
    ProductItemComponent,
    StoreSearchComponent,
    ProductSearchComponent,
    CompanySearchComponent,
    PublicServiceSearchComponent,
    StoreFilterComponent,
    ProductFilterComponent,
    CompanyFilterComponent,
    SearchNavComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports:[
    AccountDetailsComponent,
    AddressComponent,
    BannerPromotionComponent,
    BannersComponent,
    BestSellerItemComponent,
    BestSellersComponent,
    BlogSectionComponent,
    BrandsComponent,
    CategoriesComponent,
    CategoriesMenuComponent,
    CategoriesMenuItemComponent,
    CategoriesSectionComponent,
    CategoryComponent,
    DialogComponent,
    FooterComponent,
    HeaderComponent,
    InstagramComponent,
    IntroBannerOneComponent,
    IntroBannerTwoComponent,
    IntroBannerThreeComponent,
    MainCarouselComponent,
    MapComponent,
    MobileMenuComponent,
    NewsletterPopupComponent,
    OrdersComponent,
    OtherCategoriesComponent,
    PopularCategoriesComponent,
    PopularCategoriesItemComponent,
    PopularStoresComponent,
    PriceComponent,
    ProductComponent,
    ProfileComponent,
    SidebarComponent,
    SignupBannerComponent,
    StickyFooterComponent,
    StoreCarouselComponent,
    StoreDetailsComponent,
    StoreItemComponent,
    TaglineWidgetComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    StoreSearchComponent,
    ProductSearchComponent,
    CompanySearchComponent,
    PublicServiceSearchComponent,
    StoreFilterComponent,
    ProductFilterComponent,
    CompanyFilterComponent,
    SearchNavComponent
  ]
})
export class ComponentModule { }
