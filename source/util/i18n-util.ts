import {LOCAL_STORE} from "./storage/storage";
import {baseHelper} from "./base";

export const I18N_DE =
    {'language': 'Sprache', 'key2': 'value2'};

export const I18N_EN =  {'language': 'Language', 'key2': 'value2'};

export interface I18NEntry {
    key: string;
    value: string;
}

export interface I18NData {
    entries: I18NEntry[];
}

export class I18nUtil {

    static LOCAL_STORAGE_I18N_LANGUAGE_KEY: string = 'LOCAL_STORAGE_I18N_LANGUAGE_KEY';
    static LOCAL_STORAGE_I18N_LANGUAGE_SET_PREFIX: string = 'LOCAL_STORAGE_I18N_LANGUAGE_SET-';

    constructor() {
        if (baseHelper.isEmpty(LOCAL_STORE.getItem(I18nUtil.LOCAL_STORAGE_I18N_LANGUAGE_KEY))) {
            this.setLanguage(window.navigator.language);
        }

        this.saveI18NData('de-DE', I18N_DE);
        this.saveI18NData('en-EN', I18N_EN);

    }

    setLanguage(key: string) {
        LOCAL_STORE.setItem(I18nUtil.LOCAL_STORAGE_I18N_LANGUAGE_KEY, key);
    }

    getLanguage(): string | null {
        return LOCAL_STORE.getItem(I18nUtil.LOCAL_STORAGE_I18N_LANGUAGE_KEY);
    }

    getI18NData(): I18NData | null {
        return LOCAL_STORE.getItem(I18nUtil.LOCAL_STORAGE_I18N_LANGUAGE_SET_PREFIX + this.getLanguage());
    }

    saveI18NData(key: string, i18nData: any) {
        LOCAL_STORE.setItem(I18nUtil.LOCAL_STORAGE_I18N_LANGUAGE_SET_PREFIX + key, i18nData);
    }

    getValue(key: string) {
        let i18nData: any = this.getI18NData();
        if (i18nData != null) {
            return i18nData[key];
        }
        return 'key not defined: ' + key;
    }

}

export const I18N = new I18nUtil();