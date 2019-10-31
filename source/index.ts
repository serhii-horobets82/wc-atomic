import './scss/index.scss';

import './templates/import-templates';

import './atoms/import-atoms';
import './input/import-input';
import './molecules/import-molecules';
import './organisms/import-organisms'

import './app/pages/dashboard';

import './app/app-showcase';

import {
    BasicService,
    CorsMode,
    Credentials,
    DataReceiverService,
    DataStoreService,
    HttpClientIF,
    HttpClientService,
    I18nService,
    RouterService,
    SlotService,
    UiRefresherService
} from '@domoskanonos/frontend-basis';
import {AppData} from "./abstract/app/model";

export const UI_REFRESHER: UiRefresherService = new UiRefresherService();
export const baseHelper = new BasicService();
export const I18N = new I18nService(localStorage);
export const SESSION_STORE = new DataStoreService(sessionStorage);
export const LOCAL_STORE = new DataStoreService(localStorage);
export const SLOT_HELPER = new SlotService();
export const DATA_RECEIVER = new DataReceiverService();

let secured = false;

export const APP_DATA = <AppData>{
    isSecured: secured,
    description: 'Balco Tool',
    name: 'Balco',
    loginPage: '#login',
    httpClient: new HttpClientService(<HttpClientIF>{
        credentials: Credentials.INCLUDE,
        cors: CorsMode.CORS,
        defaultContentType: 'application/json',
        baseURL: 'http://v220190910399797452.supersrv.de:8095',
        isSecured: secured,
        loginPath: '/dologin',
        logoutPath: '/dologout',
    }),
    router: new RouterService(),
};