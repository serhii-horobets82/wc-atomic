export class BaseHelper {

    public isNotEmpty(value: string | undefined): boolean {
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
}

export const baseHelper = new BaseHelper();