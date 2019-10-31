import './scss/index.scss';

import './atoms/import-atoms';
import './input/import-input';
import './molecules/import-molecules';
import './organisms/import-organisms'

import './app/app-showcase';
import { UIRefresherService } from '@domoskanonos/typescript_base/source/ui-refresher/u-i-refresher-service';
import { BasicService } from '@domoskanonos/typescript_base/source/basic';
import { I18nService } from '@domoskanonos/typescript_base/source/i18n-util/i18n-util';
import { DataStoreService } from '@domoskanonos/typescript_base/source/storage/storage';

export const UI_REFRESHER: UIRefresherService = new UIRefresherService();
export const baseHelper = new BasicService();
export const I18N = new I18nService(localStorage);
export const SESSION_STORE = new DataStoreService(sessionStorage);
export const LOCAL_STORE = new DataStoreService(localStorage);
