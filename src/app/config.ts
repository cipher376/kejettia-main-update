import { environment, MAIN_IDENTITY_API_URL_LOCAL } from "src/environments/environment";

export const Urls = {
  returnUrl: '/main/pages/home',
  home: '/main/pages/home',
  forgotPassword: '/main/pages/auth/forgot',
  register: '/main/pages/auth/register',
  login: '/main/pages/auth/login',
  changePassword: '/main/pages/change-password',
  paymentPlatform: '/main/pages/payment-platform',
  error: '/main/pages/error',
  order: '/main/pages/order',
  orderDetails: '/main/pages/order-details',
  checkout: '/main/pages/checkout',
  cart: '/main/pages/cart',
  faq: '/main/pages/faq',
  about: '/main/pages/about',
  contact: '/main/pages/contact',
  account: '/main/pages/my-account',
  search: '/main/pages/search',
  wishlist: '/main/pages/wishlist',
  compare: '/main/pages/compare',

  productDetails: '/stores/pages/product-details',
  storeHome: '/stores/pages/home',
  products: '/stores/pages/products',

  googleAuthUrl: environment.googleAuthUrl,
  facebookAuthUrl: environment.facebookAuthUrl,
  twitterAuthUrl: environment.twitterAuthUrl
};

// export const STORE_DETAILS = {
//   id: '5df207867b864246841406ae'
// };

export const CONTACT_EMAIL = 'admin@kejettia.com';
export const APP_NAME = 'Kejettia.com';
export const LOGO_URL = 'http://107.152.41.194:4200/assets/images/logo.svg'
export const CONTACT_PAGE = 'http://107.152.41.194:4200/main/pages/contact'

// Paystack configuration
// export const  PAYSTACK_PUBLIC_KEY = 'pk_test_35e2d42391f82f0329280d5821807a52fdd0881f';
export const PAYSTACK_PUBLIC_KEY = 'pk_live_1bfcae71910ecde6cba942379e797b2a44cbcb23';

export const ACCOUNTANT_EMAIL = 'manager.kejettia@gmail.com';
export const ACCOUNTANT_PHONE = '+233544686951';


/*****************  API CONFIGURATION URLS ********************/


export const IDENTITY_API_URL_STAGING = ''
export const STORE_API_URL_STAGING = ''
export const FILE_API_URL_STAGING = ''
export const MESSAGE_API_URL_STAGING = ''


export const IDENTITY_API_URL_PRODUCTION = ''
export const STORE_API_URL_PRODUCTION = ''
export const FILE_API_URL_PRODUCTION = ''
export const MESSAGE_API_URL_PRODUCTION = ''





export const NO_IMAGE = '';
export const NO_STORE_IMAGE = '/assets/img/store/no_image.png';
export const NO_PRODUCT_IMAGE = '';
export const NO_USER_IMAGE = '/assets/img/avatars/user.png';

export enum PHOTO_DISPLAY_TYPES {
  COVER = 'cover',
  FRONT = 'front',
  LEFT_SIDE = 'left-side',
  RIGHT_SIDE = 'right-side',
  TOP = 'top',
  ANY = 'any',
  STREET = 'street',
  LOGO = 'logo',
  SIZE_GUIDE = 'size-guide',
  COLOR_GUIDE = 'color_guide',
  BANNER = 'banner',
  THUMBNAIL = 'thumbnail',

}
