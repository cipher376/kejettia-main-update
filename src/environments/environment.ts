// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const IDENTITY_API_PORT_LOCAL = '3002'
export const IDENTITY_API_HOST_LOCAL = 'http://localhost'
export const IDENTITY_API_URL_LOCAL = `${IDENTITY_API_HOST_LOCAL}:${IDENTITY_API_PORT_LOCAL}`

export const STORE_API_PORT_LOCAL = '3001'
export const STORE_API_HOST_LOCAL = 'http://localhost'
export const STORE_API_URL_LOCAL = `${STORE_API_HOST_LOCAL}:${STORE_API_PORT_LOCAL}`

export const WC_STORE_API_PORT_LOCAL = '3006'
export const WC_STORE_API_HOST_LOCAL = 'http://localhost'
export const WC_STORE_API_URL_LOCAL = `${WC_STORE_API_HOST_LOCAL}:${WC_STORE_API_PORT_LOCAL}`

export const FILE_API_PORT_LOCAL = '3003'
export const FILE_API_HOST_LOCAL = 'http://localhost'
export const FILE_API_URL_LOCAL = `${FILE_API_HOST_LOCAL}:${FILE_API_PORT_LOCAL}/file`

export const MESSAGE_API_PORT_LOCAL = '3004'
export const MESSAGE_API_HOST_LOCAL = 'http://localhost'
export const MESSAGE_API_URL_LOCAL = `${MESSAGE_API_HOST_LOCAL}:${MESSAGE_API_PORT_LOCAL}`

export const EMPLOYEE_ACCOUNT_API_PORT_LOCAL = '3005'
export const EMPLOYEE_ACCOUNT_API_HOST_LOCAL = 'http://localhost'
export const EMPLOYEE_ACCOUNT_API_URL_LOCAL = `${EMPLOYEE_ACCOUNT_API_HOST_LOCAL}:${EMPLOYEE_ACCOUNT_API_PORT_LOCAL}`

export const MAIN_IDENTITY_API_PORT_LOCAL = '3000'
export const MAIN_IDENTITY_API_HOST_LOCAL = 'http://localhost'
export const MAIN_IDENTITY_API_URL_LOCAL = `${MAIN_IDENTITY_API_HOST_LOCAL}:${MAIN_IDENTITY_API_PORT_LOCAL}`





/********************************* REMOTE SERVER CONNECTIONS ************************************/

// export const EMPLOYEE_ACCOUNT_API_HOST_LOCAL = 'https://employee-account.api.kejettia.com'
// export const EMPLOYEE_ACCOUNT_API_URL_LOCAL = `${EMPLOYEE_ACCOUNT_API_HOST_LOCAL}`

// export const MESSAGE_API_HOST_LOCAL = 'https://message.api.kejettia.com'
// export const MESSAGE_API_URL_LOCAL = `${MESSAGE_API_HOST_LOCAL}`

// export const FILE_API_HOST_LOCAL = 'https://file.api.kejettia.com'
// export const FILE_API_URL_LOCAL = `${FILE_API_HOST_LOCAL}/file`

// export const IDENTITY_API_HOST_LOCAL = 'https://kejettia-identity.api.kejettia.com'
// export const IDENTITY_API_URL_LOCAL = `${IDENTITY_API_HOST_LOCAL}`

// export const MAIN_IDENTITY_API_HOST_LOCAL = 'https://main-identity.api.kejettia.com'
// export const MAIN_IDENTITY_API_URL_LOCAL = `${MAIN_IDENTITY_API_HOST_LOCAL}`

// export const STORE_API_HOST_LOCAL = 'https://store.api.kejettia.com'
// export const STORE_API_URL_LOCAL = `${STORE_API_HOST_LOCAL}`




export const environment = {
  production: false,

  employee_account_api_root_url: EMPLOYEE_ACCOUNT_API_URL_LOCAL,
  store_api_root_url: STORE_API_URL_LOCAL,
  wc_store_api_root_url: WC_STORE_API_URL_LOCAL,
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
