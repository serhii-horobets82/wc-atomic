import {UI_REFRESH} from "./ui-refresh";

export class SessionStore {

    private storage: Storage;

    constructor(storage: Storage) {
        this.storage = storage;
    }

    setItem(channel: string, content: any) {
        this.storage.setItem(channel, JSON.stringify(content));
        UI_REFRESH.informListener(channel, content);
    }

    getItem<T>(channel: string | null): T | null {
        if (channel != null) {
            let item = this.storage.getItem(channel);
            return item !== null ? <T>JSON.parse(item) : null;
        } else {
            return null;
        }
    }

    removeItem(channel: string) {
        console.log('remove channel: ' + channel);
        if (channel != null) {
            this.storage.removeItem(channel);
        }
    }
}

export const SESSION_STORE = new SessionStore(sessionStorage);
export const LOCAL_STORE = new SessionStore(localStorage);


