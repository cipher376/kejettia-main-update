export const Urls = {
  returnUrl:'/main/pages/home',
  home: '/main/pages/home',
  forgotPassword: '/main/pages/auth/forgot',
  register: '/main/pages/auth/register',
  login: '/main/pages/auth/login',
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
  storeHome: '/stores/pages/home'
};

// export const STORE_DETAILS = {
//   id: '5df207867b864246841406ae'
// };

// export const CONTACT_EMAIL = 'kejetia00@gmail.com';
export const CONTACT_EMAIL = 'kejettia.market@gmail.com';
export const APP_NAME = 'Kejettia';


// Paystack configuration
export const  PAYSTACK_PUBLIC_KEY = 'pk_test_35e2d42391f82f0329280d5821807a52fdd0881f';


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






export const IDENTITY_API_PORT_LOCAL = '3002'
export const IDENTITY_API_HOST_LOCAL = 'http://localhost'
export const IDENTITY_API_URL_LOCAL = `${IDENTITY_API_HOST_LOCAL}:${IDENTITY_API_PORT_LOCAL}`

export const STORE_API_PORT_LOCAL = '3001'
export const STORE_API_HOST_LOCAL = 'http://localhost'
export const STORE_API_URL_LOCAL = `${STORE_API_HOST_LOCAL}:${STORE_API_PORT_LOCAL}`

export const FILE_API_PORT_LOCAL = '3003'
export const FILE_API_HOST_LOCAL = 'http://localhost'
export const FILE_API_URL_LOCAL = `${FILE_API_HOST_LOCAL}:${FILE_API_PORT_LOCAL}/file`

export const MESSAGE_API_PORT_LOCAL = '3004'
export const MESSAGE_API_HOST_LOCAL = 'http://localhost'
export const MESSAGE_API_URL_LOCAL = `${MESSAGE_API_HOST_LOCAL}:${MESSAGE_API_PORT_LOCAL}`

export const EMPLOYEE_ACCOUNT_API_PORT_LOCAL = '3005'
export const EMPLOYEE_ACCOUNT_API_HOST_LOCAL = 'http://localhost'
export const EMPLOYEE_ACCOUNT_API_URL_LOCAL = `${EMPLOYEE_ACCOUNT_API_HOST_LOCAL}:${EMPLOYEE_ACCOUNT_API_PORT_LOCAL}`



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
  THUMBNAIL ='thumbnail',

}
