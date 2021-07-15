// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EMPLOYEE_ACCOUNT_API_URL_LOCAL, STORE_API_URL_LOCAL, IDENTITY_API_URL_LOCAL, FILE_API_URL_LOCAL, MESSAGE_API_URL_LOCAL } from "src/app/config";

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
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
