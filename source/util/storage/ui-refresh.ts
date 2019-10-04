export interface UIRefreshListener {
    updateUI(channel: string, data: any): void;
}

export class UIRefresh {

    private uiRefreshListener = new Map<String, UIRefreshListener[]>();

    register(channel: string, listener: UIRefreshListener): any {
        let channelListener: UIRefreshListener[] | undefined = this.uiRefreshListener.get(channel);
        if (channelListener == undefined) {
            channelListener = [];
            this.uiRefreshListener.set(channel, channelListener);
        }
        channelListener.push(listener);
        console.log('register channelListener: ' + channel + ', new register size: ' + channelListener.length);
    }

    unregister(channel: string, listener: UIRefreshListener): void {
        let channelListener: UIRefreshListener[] | undefined = this.uiRefreshListener.get(channel);
        if (channelListener == undefined) {
            console.log("nothing to remove");
            return;
        }
        let indexOfChannelListener = channelListener.indexOf(listener);
        console.log('remove listener on index=' + indexOfChannelListener);
        channelListener = channelListener.slice(indexOfChannelListener, 1);
        this.uiRefreshListener.set(channel, channelListener);
        console.log("unregister size:" + channelListener.length);
    }

    informListener(channel: string, data: any) {
        let channelListener = this.uiRefreshListener.get(channel);
        if (channelListener != undefined) {
            channelListener.forEach(listener => {
                console.log("data received for channel: " + channel);
                listener.updateUI(channel, data);
            });
        }
    }

}

export const UI_REFRESH = new UIRefresh();