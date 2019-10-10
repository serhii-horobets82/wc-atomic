import {LOCAL_STORE} from "./storage/storage";
import {baseHelper} from "./base";

export interface LanguageItem {
    locale: string;
    code: string;
    key: string;
    value: string;
}

export class I18nUtil {

    static LOCAL_STORAGE_I18N_LANGUAGE_KEY: string = 'LOCAL_STORAGE_I18N_LANGUAGE_KEY';
    static LOCAL_STORAGE_I18N_LANGUAGE_SET_PREFIX: string = 'LOCAL_STORAGE_I18N_LANGUAGE_SET-';

    constructor() {
        if (baseHelper.isEmpty(LOCAL_STORE.getItem(I18nUtil.LOCAL_STORAGE_I18N_LANGUAGE_KEY))) {
            this.setLanguage(window.navigator.language);
        }
    }

    setLanguage(locale: string | null) {
        LOCAL_STORE.setItem(I18nUtil.LOCAL_STORAGE_I18N_LANGUAGE_KEY, locale);
    }

    getLanguage(): string | null {
        return LOCAL_STORE.getItem(I18nUtil.LOCAL_STORAGE_I18N_LANGUAGE_KEY);
    }

    getICurrent18NData(): {} | null {
        return this.getI18NData(this.getLanguage());
    }

    private getI18NData(locale: string | null): {} | null {
        return LOCAL_STORE.getItem(I18nUtil.LOCAL_STORAGE_I18N_LANGUAGE_SET_PREFIX + locale);
    }


    saveI18NData(i18nData: {}, locale: string | null = this.getLanguage()) {
        LOCAL_STORE.setItem(I18nUtil.LOCAL_STORAGE_I18N_LANGUAGE_SET_PREFIX + locale, i18nData);
    }

    getValue(key: string) {
        let i18nData: any = this.getICurrent18NData();
        let value = '';
        if (i18nData != null && i18nData[key] != null) {
            value = i18nData[key];
        }
        return value.length > 0 ? value : '???'.concat(key).concat('???');
    }

    addItem(item: LanguageItem) {
        console.log('add language item: ' + JSON.stringify(item));
        let i18NData = this.getI18NData(item.code);
        if (i18NData == null) {
            i18NData = {};
        }
        i18NData[item.key] = item.value;
        this.saveI18NData(item.code, i18NData);

    }
}

export const I18N = new I18nUtil();