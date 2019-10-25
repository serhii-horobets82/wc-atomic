import {I18N} from "./i18n-util";

export class BaseHelper {

    public isNotEmpty(value: any | undefined): boolean {
        return !this.isEmpty(value);
    }

    public isEmpty(value: any | undefined): boolean {
        return value === null || value === undefined;
    }

    public isBlank(value: string | undefined): boolean {
        return this.isEmpty(value) || "" == value;
    }

    public isNotBlank(value: string | undefined): boolean {
        return !this.isBlank(value);
    }

    clone(source: any): any {
        return Object.assign({}, source);
    }

    isEqual(first: string | undefined, second: string | undefined) {
        return first === second;
    }

    getValue(value: any | undefined | null, defaultValue: any): any {
        if (value === null || value === undefined) {
            return defaultValue;
        }
        return value;
    }

    beautifyText(value: any): string {
        if (value == null || value == undefined) {
            return "";
        } else if (value instanceof Number|| typeof value == 'number') {
            // TODO: funktioniert nicht mit options minimumFractionDigits: 2, maximumFractionDigits: 2 ??? warum nicht
            return value.toLocaleString(window.navigator.language, {});
        } else if (value instanceof Date) {
            return value.toLocaleString();
        }
        return value;
    }
}

export const baseHelper = new BaseHelper();