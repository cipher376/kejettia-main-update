import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxUploadModule } from "@wkoza/ngx-upload";
import { ngxDropTargetOptions } from "@wkoza/ngx-upload/utils/configuration.model";
import { NgxPaginationModule } from "ngx-pagination";
import { BackgroundImageDirective } from "./directives/image-background.directive";
import { OrderByPipe } from "./pipes/order-by.pipe";
import { CartService } from "./services/cart.service";
import { ProductService } from "./services/product.service";
import { BannerPromotionComponent } from "./ui-components/banner-promotion/banner-promotion.component";
import { BannersComponent } from "./ui-components/banners/banners.component";
import { BlogSectionComponent } from "./ui-components/blog-section/blog-section.component";
import { BrandsComponent } from "./ui-components/brands/brands.component";
import { CategoriesMenuComponent } from "./ui-components/categories-menu/categories-menu.component";
import { CategoriesSectionComponent } from "./ui-components/categories-section/categories-section.component";
import { CategoriesComponent } from "./ui-components/categories/categories.component";
import { CategoryComponent } from "./ui-components/category/category.component";
import { FooterComponent } from "./ui-components/footer/footer.component";
import { HeaderComponent } from "./ui-components/header/header.component";
import { MainCarouelComponent } from "./ui-components/main-carouel/main-carouel.component";
import { PriceComponent } from "./ui-components/price/price.component";
import { ProductComponent } from "./ui-components/product/product.component";
import { SidebarItemComponent } from "./ui-components/sidebar/sidebar-item/sidebar-item.component";
import { SidebarComponent } from "./ui-components/sidebar/sidebar.component";
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BestSellerItemComponent } from "./ui-components/best-seller-item/best-seller-item.component";
import { BestSellersComponent } from "./ui-components/best-sellers/best-sellers.component";
import { DialogComponent } from "./ui-components/dialog/dialog.component";
import { InstagramComponent } from "./ui-components/instagram/instagram.component";
import { IntroBannerOneComponent } from "./ui-components/intro-banner-one/intro-banner-one.component";
import { IntroBannerThreeComponent } from "./ui-components/intro-banner-three/intro-banner-three.component";
import { IntroBannerTwoComponent } from "./ui-components/intro-banner-two/intro-banner-two.component";
import { MobileMenuComponent } from "./ui-components/mobile-menu/mobile-menu.component";
import { NewsletterPopupComponent } from "./ui-components/newsletter-popup/newsletter-popup.component";
import { OtherCategoriesComponent } from "./ui-components/other-categories/other-categories.component";
import { PopularCategoriesItemComponent } from "./ui-components/popular-categories-item/popular-categories-item.component";
import { PopularCategoriesComponent } from "./ui-components/popular-categories/popular-categories.component";
import { PopularStoresComponent } from "./ui-components/popular-stores/popular-stores.component";
import { SignupBannerComponent } from "./ui-components/signup-banner/signup-banner.component";
import { StickyFooterComponent } from "./ui-components/sticky-footer/sticky-footer.component";
import { StoreCarouselComponent } from "./ui-components/store-carousel/store-carousel.component";
import { StoreDetailsComponent } from "./ui-components/store-details/store-details.component";
import { TaglineWidgetComponent } from "./ui-components/tagline-widget/tagline-widget.component";
import { AddressComponent } from "./ui-components/address/address.component";
import { CategoriesMenuItemComponent } from "./ui-components/categories-menu-item/categories-menu-item.component";
import { OrdersComponent } from "./ui-components/orders/orders.component";
import { ProfileComponent } from "./ui-components/profile/profile.component";
import { StoreItemComponent } from "./ui-components/store-item/store-item.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";



@NgModule({
  declarations: [
    OrderByPipe,
    BackgroundImageDirective,
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
    PopularStoresComponent,
    PriceComponent,
    ProductComponent,
    SidebarComponent,
    SidebarItemComponent,
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
    IntroBannerOneComponent,
    IntroBannerTwoComponent,
    IntroBannerThreeComponent,
    OtherCategoriesComponent,
    NewsletterPopupComponent,
    PopularCategoriesItemComponent,
    BestSellerItemComponent,
    StoreItemComponent,
    ProfileComponent,
    OrdersComponent,
    AddressComponent,
    CategoriesMenuItemComponent,


  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    // NgxImageZoomModule.forRoot(),
    // Angular4PaystackModule.forRoot(PAYSTACK_PUBLIC_KEY),
    // NgxUploadModule.forRoot(ngxDropTargetOptions, {
    //   enabled: true,
    //   debug: true
    // }),
    ProgressbarModule.forRoot(),
  ],
  exports: [
    OrderByPipe,
    BackgroundImageDirective,
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
    PopularStoresComponent,
    PriceComponent,
    ProductComponent,
    SidebarComponent,
    SidebarItemComponent,
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
    IntroBannerOneComponent,
    IntroBannerTwoComponent,
    IntroBannerThreeComponent,
    OtherCategoriesComponent,
    NewsletterPopupComponent,
    PopularCategoriesItemComponent,
    BestSellerItemComponent,
    StoreItemComponent,
    ProfileComponent,
    OrdersComponent,
    AddressComponent,
    CategoriesMenuItemComponent,
  ],

})


export class SharedModule {}
