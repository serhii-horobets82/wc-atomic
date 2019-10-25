import {BasicUtil, DataStore, I18nUtil, UIRefresher} from '@domoskanonos/typescript_base';
import './scss/index.scss';

import './atoms/import-atoms';
import './input/import-input';
import './molecules/import-molecules';
import './organisms/import-organisms'

import './app/app-showcase';

export const UI_REFRESHER: UIRefresher = new UIRefresher();
export const baseHelper = new BasicUtil();
export const I18N = new I18nUtil(localStorage);
export const SESSION_STORE = new DataStore(sessionStorage);
export const LOCAL_STORE = new DataStore(localStorage);