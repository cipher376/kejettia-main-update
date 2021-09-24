// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const EMPLOYEE_ACCOUNT_API_HOST_LOCAL = 'http://employee-account.api.devtek-limited.tech'
export const EMPLOYEE_ACCOUNT_API_URL_LOCAL = `${EMPLOYEE_ACCOUNT_API_HOST_LOCAL}`

export const MESSAGE_API_HOST_LOCAL = 'http://message-api.devtek-limited.tech'
export const MESSAGE_API_URL_LOCAL = `${MESSAGE_API_HOST_LOCAL}`

export const FILE_API_HOST_LOCAL = 'http://file-api.devtek-limited.tech'
export const FILE_API_URL_LOCAL = `${FILE_API_HOST_LOCAL}/file`

export const IDENTITY_API_HOST_LOCAL = 'http://kejettia-identity.api.devtek-limited.tech'
export const IDENTITY_API_URL_LOCAL = `${IDENTITY_API_HOST_LOCAL}`

export const MAIN_IDENTITY_API_HOST_LOCAL = 'http://main-identity.api.devtek-limited.tech'
export const MAIN_IDENTITY_API_URL_LOCAL = `${MAIN_IDENTITY_API_HOST_LOCAL}`

export const STORE_API_HOST_LOCAL = 'http://store-api.devtek-limited.tech'
export const STORE_API_URL_LOCAL = `${STORE_API_HOST_LOCAL}`




export const environment = {
  production: false,

  employee_account_api_root_url: EMPLOYEE_ACCOUNT_API_URL_LOCAL,
  store_api_root_url: STORE_API_URL_LOCAL,
  identity_api_root_url: IDENTITY_API_URL_LOCAL,
  file_api_root_url: FILE_API_URL_LOCAL,
  file_api_download_url_root: FILE_API_URL_LOCAL + '/download/',
  file_api_upload_url_root: FILE_API_URL_LOCAL + '/upload/',
  file_api_upload_photo_video_url_root: FILE_API_URL_LOCAL + '/photo-video-upload/',
  message_api_root_url: MESSAGE_API_URL_LOCAL,

  googleAuthUrl: MAIN_IDENTITY_API_URL_LOCAL + '/api/auth/thirdparty/google',
  facebookAuthUrl: MAIN_IDENTITY_API_URL_LOCAL + '/api/auth/thirdparty/facebook',
  twitterAuthUrl: MAIN_IDENTITY_API_URL_LOCAL + '/api/auth/thirdparty/twitter'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
