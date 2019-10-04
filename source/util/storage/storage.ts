import {SessionStoreListener} from "./model";


export class SessionStore {

    listener = new Map<String, SessionStoreListener[]>();

    constructor() {
    }

    register(channel: string, listener: SessionStoreListener): any {
        let channelListener: SessionStoreListener[] | undefined = this.listener.get(channel);
        if (channelListener == undefined) {
            channelListener = [];
            this.listener.set(channel, channelListener);
        }
        channelListener.push(listener);
        console.log("listener size:" + channelListener.length);
    }

    unregister(channel: string, listener: SessionStoreListener): void {
        let channelListener: SessionStoreListener[] | undefined = this.listener.get(channel);
        if (channelListener == undefined) {
            console.log("nothing to remove");
            return;
        }
        channelListener = channelListener.slice(channelListener.findIndex(listener), 1);
        this.listener.set(channel, channelListener);
        console.log("listener size:" + channelListener.length);
    }


    setItem(channel: string, content: any) {
        this.setItemString(channel, JSON.stringify(content));


    }

    setItemString(channel: string, content: string) {
        sessionStorage.setItem(channel, content);
        let channelListener = this.listener.get(channel);
        if (channelListener != undefined) {
            channelListener.forEach(listener => {
                console.log("data received for channel: " + channel);
                listener.channelUpdated(channel);
            });
        }
    }

    getItem<T>(channel: string | null): T | null {
        if (channel != null) {
            let item = sessionStorage.getItem(channel);
            return item !== null ? <T>JSON.parse(item) : null;
        } else {
            return null;
        }
    }

    removeItem(channel: string) {
        if (channel != null) {
            sessionStorage.removeItem(channel);
        }
    }

}

export const SESSION_STORE = new SessionStore();


