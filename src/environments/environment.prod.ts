
import { LoopBackConfig as identityConfig } from '../app/shared/identity-sdk/lb.config';
import { LoopBackConfig as storeConfig } from '../app/shared/store-sdk/lb.config';
import { LoopBackConfig as companyConfig } from '../app/shared/company-sdk/lb.config';
import {
  identityApiVersion, identityProtocol, identityApiUrl, storeApiVersion,
  storeProtocol, storeApiUrl, companyApiVersion, companyProtocol, companyApiUrl, companyApiUrlLocal,
  companyApiVersionLocal, companyProtocolLocal, identityApiUrlLocal, identityApiVersionLocal, identityProtocolLocal,
  storeApiUrlLocal, storeApiVersionLocal, storeProtocolLocal, identityFileRootUrl, storeFileRootUrl
} from 'src/app/config';

const port = window.location.port ? ':' + window.location.port : '';




export const environment = {
  production: true,
  envName: 'prod',
  storeion: true,

  identityApiUrl: identityProtocol + identityApiUrl,
  identityFileRootUrl: identityProtocol + identityFileRootUrl,
  identityApiVersion,


  storeApiUrl: storeProtocol + storeApiUrl,
  storeFileRootUrl: storeProtocolLocal + storeFileRootUrl,
  storeApiVersion,

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

  //   fb_auth_callback_url: protocol + apiUrl + '/' + apiVersion + '/facebook/callback',
  //   fb_auth_success_url: protocol + apiUrl + '/' + apiVersion + '/FameIdentities/me?access_token=',
  //   fb_auth_url: protocol + apiUrl + '/auth/facebook?returnTo=' + window.location.protocol +
  //     '//' + window.location.hostname + port + '/login',

  //   google_auth_callback_url: protocol + apiUrl + '/' + apiVersion + '/google/callback',
  //   google_auth_success_url: protocol + apiUrl + '/' + apiVersion + '/FameIdentities/me?access_token=',
  //   google_auth_url: protocol + apiUrl + '/auth/google?returnTo=' + window.location.protocol + '//'
  //     + window.location.hostname + port + '/login'
};


export function initApiStagging() {
  identityConfig.setApiVersion(identityApiVersion);
  identityConfig.setBaseURL(identityProtocol + identityApiUrl);

  storeConfig.setApiVersion(storeApiVersion);
  storeConfig.setBaseURL(storeProtocol + storeApiUrl);

  companyConfig.setApiVersion(companyApiVersion);
  companyConfig.setBaseURL(companyProtocol + companyApiUrl);
}

export function initApiProduction() {
  identityConfig.setApiVersion(identityApiVersion);
  identityConfig.setBaseURL(identityProtocol + identityApiUrl);

  storeConfig.setApiVersion(storeApiVersion);
  storeConfig.setBaseURL(storeProtocol + storeApiUrl);

  companyConfig.setApiVersion(companyApiVersion);
  companyConfig.setBaseURL(companyProtocol + companyApiUrl);
}

export function initApiLocal() {
  identityConfig.setApiVersion(identityApiVersionLocal);
  identityConfig.setBaseURL(identityProtocolLocal + identityApiUrlLocal);

  storeConfig.setApiVersion(storeApiVersionLocal);
  storeConfig.setBaseURL(storeProtocolLocal + storeApiUrlLocal);

  companyConfig.setApiVersion(companyApiVersionLocal);
  companyConfig.setBaseURL(companyProtocolLocal + companyApiUrlLocal);
}
