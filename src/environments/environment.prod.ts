


export const EMPLOYEE_ACCOUNT_API_HOST_PRODUCTION = 'https://employee-account.api.kejettia.com'
export const EMPLOYEE_ACCOUNT_API_URL_PRODUCTION = `${EMPLOYEE_ACCOUNT_API_HOST_PRODUCTION}`

export const MESSAGE_API_HOST_PRODUCTION = 'https://message.api.kejettia.com'
export const MESSAGE_API_URL_PRODUCTION = `${MESSAGE_API_HOST_PRODUCTION}`

export const FILE_API_HOST_PRODUCTION = 'https://file.api.kejettia.com'
export const FILE_API_URL_PRODUCTION = `${FILE_API_HOST_PRODUCTION}/file`

export const IDENTITY_API_HOST_PRODUCTION = 'https://kejettia-identity.api.kejettia.com'
export const IDENTITY_API_URL_PRODUCTION = `${IDENTITY_API_HOST_PRODUCTION}`

export const MAIN_IDENTITY_API_HOST_PRODUCTION = 'https://main-identity.api.kejettia.com'
export const MAIN_IDENTITY_API_URL_PRODUCTION = `${MAIN_IDENTITY_API_HOST_PRODUCTION}`

export const STORE_API_HOST_PRODUCTION = 'https://store.api.kejettia.com'
export const STORE_API_URL_PRODUCTION = `${STORE_API_HOST_PRODUCTION}`



export const environment = {
  production: true,
  envName: 'prod',
  storeion: true,


  // Firebase FCM configruation
  firebaseConfig: {
    apiKey: 'AIzaSyDgBBlcPyMmo_ypReIcuSbEEnVb9jH3uvg',
    authDomain: 'famefcm376.firebaseapp.com',
    databaseURL: 'https://famefcm376.firebaseio.com',
    projectId: 'famefcm376',
    storageBucket: '',
    messagingSenderId: '514730217551',
    appId: '1:514730217551:web:2c8a2c22306e92cb'
  },

  employee_account_api_root_url: EMPLOYEE_ACCOUNT_API_URL_PRODUCTION,
  store_api_root_url: STORE_API_URL_PRODUCTION,
  identity_api_root_url: IDENTITY_API_URL_PRODUCTION,
  file_api_root_url: FILE_API_URL_PRODUCTION,
  file_api_download_url_root: FILE_API_URL_PRODUCTION + '/download/',
  file_api_upload_url_root: FILE_API_URL_PRODUCTION + '/upload/',
  file_api_upload_photo_video_url_root: FILE_API_URL_PRODUCTION + '/photo-video-upload/',
  message_api_root_url: MESSAGE_API_URL_PRODUCTION,

  googleAuthUrl: MAIN_IDENTITY_API_URL_PRODUCTION + '/api/auth/thirdparty/google',
  facebookAuthUrl: MAIN_IDENTITY_API_URL_PRODUCTION + '/api/auth/thirdparty/facebook',
  twitterAuthUrl: MAIN_IDENTITY_API_URL_PRODUCTION + '/api/auth/thirdparty/twitter'

  //   fb_auth_callback_url: protocol + apiUrl + '/' + apiVersion + '/facebook/callback',
  //   fb_auth_success_url: protocol + apiUrl + '/' + apiVersion + '/FameIdentities/me?access_token=',
  //   fb_auth_url: protocol + apiUrl + '/auth/facebook?returnTo=' + window.location.protocol +
  //     '//' + window.location.hostname + port + '/login',

  //   google_auth_callback_url: protocol + apiUrl + '/' + apiVersion + '/google/callback',
  //   google_auth_success_url: protocol + apiUrl + '/' + apiVersion + '/FameIdentities/me?access_token=',
  //   google_auth_url: protocol + apiUrl + '/auth/google?returnTo=' + window.location.protocol + '//'
  //     + window.location.hostname + port + '/login'
};


