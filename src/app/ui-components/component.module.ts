import { SimpleModalModule } from 'ngx-simple-modal';
import { UploadComponent } from './upload/upload.component';
import { PaystackComponent } from './paystack/paystack.component';
import { GalleryWrapperComponent } from './gallery-wrapper/gallery-wrapper.component';
import { BlogWidgetComponent } from './blog-widget/blog-widget.component';
import { BrandsHorizontalComponent } from './brands-horizontal/brands-horizontal.component';
import { BlackFridayAdComponent } from './black-friday-ad/black-friday-ad.component';
import { PopularProductsComponent } from './popular-products/popular-products.component';
import { ProductDetailsCustomComponent } from './product-details-custom/product-details-custom.component';
import { ProductSalesWidgetComponent } from './product-sales-widget/product-sales-widget.component';
import { ProductThumbHorizontalComponent } from './product-thumb-horizontal/product-thumb-horizontal.component';
import { ProductThumbVerticalComponent } from './product-thumb-vertical/product-thumb-vertical.component';
import { SalesWidgetComponent } from './sales-widget/sales-widget.component';
import { TestimonialWidgetComponent } from './testimonial-widget/testimonial-widget.component';
import { TopProductsComponent } from './top-products/top-products.component';
import { TrendProductsComponent } from './trend-products/trend-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';

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
import { FooterComponent } from './footer/footer.component';
import { InstagramComponent } from './instagram/instagram.component';
import { IntroBannerOneComponent } from './intro-banner-one/intro-banner-one.component';
import { IntroBannerThreeComponent } from './intro-banner-three/intro-banner-three.component';
import { IntroBannerTwoComponent } from './intro-banner-two/intro-banner-two.component';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { MapComponent } from './map/map.component';
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
import { Home2CategoriesComponent } from './home2-categories/home2-categories.component';
import { Home2SliderComponent } from './home2-slider/home2-slider.component';
import { Home2CategoryBadgeComponent } from './home2-category-badge/home2-category-badge.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { MixedSearchComponent } from './mixed-search/mixed-search.component';
import { CartMiniComponent } from './cart-mini/cart-mini.component';
import { LoaderMiniComponent } from './loader-mini/loader-mini.component';
import { LoaderFullComponent } from './loader-full/loader-full.component';
import { MixedSearchFilterComponent } from './mixed-search-filter/mixed-search-filter.component';
import { CompanyItemComponent } from './company-item/company-item.component';
import { FeatureSelectComponent } from './feature-select/feature-select.component';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { ReviewCommentsComponent } from './review-comments/review-comments.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { RelatedProductComponent } from './related-product/related-product.component';
import { VideoWidgetComponent } from './video-widget/video-widget.component';
import { DeliverySelectComponent } from './delivery-select/delivery-select.component';
import { ShippingViewComponent } from './shipping-view/shipping-view.component';
import { CreateAddressComponent } from './create-address/create-address.component';
import { CreateDeliveryAddressComponent } from './create-delivery-address/create-delivery-address.component';
import { SelectModule } from 'ng-select';
// import { Angular4PaystackModule } from 'angular4-paystack';
// import { PAYSTACK_PUBLIC_KEY } from '../config';
import { StoreProductFilterComponent } from './store-product-filter/store-product-filter.component';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { SizeFilterComponent } from './size-filter/size-filter.component';
import { ColorFilterComponent } from './color-filter/color-filter.component';
import { BrandFilterComponent } from './brand-filter/brand-filter.component';
import { PriceFilterComponent } from './price-filter/price-filter.component';
import { ProductCategoryFilterComponent } from './product-category-filter/product-category-filter.component';
import { ProductListWidgetComponent } from './product-list-widget/product-list-widget.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { SanitizeHtmlPipe } from '../shared/pipes/sanitize-html.pipe';
import { PaynowComponent } from './paynow/paynow.component';
import { ProductVariationSelectComponent } from './product-variation-select/product-variation-select.component';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from "ng-recaptcha";
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { AppleLoginComponent } from './apple-login/apple-login.component';
// import { provideOAuthClient } from 'angular-oauth2-oidc';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AgeRestrictionComponent } from './age-restriction/age-restriction.component';

@NgModule({
  declarations: [
    AccountDetailsComponent,
    AddressComponent,
    FacebookLoginComponent,
    AppleLoginComponent,
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
    RatingComponent,
    Home2CategoriesComponent,
    Home2SliderComponent,
    Home2CategoryBadgeComponent,
    FeaturedProductsComponent,
    TrendProductsComponent,
    TopProductsComponent,
    TestimonialWidgetComponent,
    SalesWidgetComponent,
    ProductThumbVerticalComponent,
    ProductThumbHorizontalComponent,
    ProductSalesWidgetComponent,
    ProductDetailsCustomComponent,
    PopularProductsComponent,
    BlackFridayAdComponent,
    BrandsHorizontalComponent,
    BlogWidgetComponent,
    MixedSearchComponent,
    CartMiniComponent,
    LoaderMiniComponent,
    LoaderFullComponent,
    MixedSearchFilterComponent,
    CompanyItemComponent,
    FeatureSelectComponent,
    GalleryWrapperComponent,
    ReviewCommentsComponent,
    AddReviewComponent,
    RelatedProductComponent,
    VideoWidgetComponent,
    DeliverySelectComponent,
    ShippingViewComponent,
    CreateAddressComponent,
    CreateDeliveryAddressComponent,
    // PaystackComponent,
    StoreProductFilterComponent,
    CategoryFilterComponent,
    SizeFilterComponent,
    ColorFilterComponent,
    BrandFilterComponent,
    PriceFilterComponent,
    ProductCategoryFilterComponent,
    ProductListWidgetComponent,
    UploadComponent,
    WhatsappComponent,
    SanitizeHtmlPipe,
    PaynowComponent,
    ProductVariationSelectComponent,
    GoogleLoginComponent,
    SocialMediaComponent,
    AgeRestrictionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    GalleryModule,
    LightboxModule,
    SelectModule,
    // ModalModule,
    ProgressbarModule.forRoot(),
    // Angular4PaystackModule.forRoot(PAYSTACK_PUBLIC_KEY),
    RecaptchaModule,
    OAuthModule.forRoot()
  ],
  exports: [
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
    FacebookLoginComponent,
    AppleLoginComponent,
    CategoryComponent,
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
    SearchNavComponent,
    Home2CategoriesComponent,
    Home2SliderComponent,
    Home2CategoryBadgeComponent,
    FeaturedProductsComponent,
    TrendProductsComponent,
    TopProductsComponent,
    TestimonialWidgetComponent,
    SalesWidgetComponent,
    ProductThumbVerticalComponent,
    ProductThumbHorizontalComponent,
    ProductSalesWidgetComponent,
    ProductDetailsCustomComponent,
    PopularProductsComponent,
    BlackFridayAdComponent,
    BrandsHorizontalComponent,
    BlogWidgetComponent,
    MixedSearchComponent,
    CartMiniComponent,
    MixedSearchFilterComponent,
    FeatureSelectComponent,
    GalleryWrapperComponent,
    CreateAddressComponent,
    CreateDeliveryAddressComponent,
    // PaystackComponent,
    StoreProductFilterComponent,
    CategoryFilterComponent,
    SizeFilterComponent,
    ColorFilterComponent,
    BrandFilterComponent,
    PriceFilterComponent,
    ProductCategoryFilterComponent,
    ProductItemComponent,
    ProductListWidgetComponent,
    LoaderFullComponent,
    LoaderMiniComponent,
    UploadComponent,
    WhatsappComponent,
    SanitizeHtmlPipe,
    PaynowComponent,
    ProductVariationSelectComponent,
    GoogleLoginComponent,
    SocialMediaComponent,
    RelatedProductComponent,
    AgeRestrictionComponent,
    
  ], 
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: "6LdqzcglAAAAAHtt26F2BlHWM3exGscEGp2Uw-1t" } as RecaptchaSettings,
    },
    // provideOAuthClient()
  ]
})
export class ComponentModule { }
