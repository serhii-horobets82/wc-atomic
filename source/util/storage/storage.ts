import {AbstractComponent} from "../../abstract/component/component";
import {AbstractInputData} from "../../abstract/component/model";

export class Store {

    listener = new Map<String, AbstractComponent<any, any>[]>();

    constructor() {

    }

    register(channel: string, consumer: AbstractComponent<AbstractInputData, any>) {
        let channelListener: AbstractComponent<any, any>[] | undefined = this.listener.get(channel);
        if (channelListener == undefined) {
            channelListener = [];
            this.listener.set(channel, channelListener);
        }
        channelListener.push(consumer);
        console.log("listener size:" + channelListener.length);
    }

    addData(channel: string, content: string) {
        sessionStorage.setItem(channel, content);
        let channelListener = this.listener.get(channel);
        if (channelListener != undefined) {
            channelListener.forEach(listener => {
                console.log("data received for channel: " + channel);
                listener.dynamicData(channel, content);
            });
        }
    }

    getData<T>(channel: string | null): T | null {
        if (channel != null) {
            let item = sessionStorage.getItem(channel);
            return item !== null ? <T>JSON.parse(item) : null;
        } else {
            return null;
        }
    }

}

export const store = new Store();
