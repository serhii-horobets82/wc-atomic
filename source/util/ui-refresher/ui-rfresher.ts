export interface UIRefresherListener {
    updateUI(channel: string): void;
}

export class UiRfresher {

    private uiRefreshListener = new Map<String, UIRefresherListener[]>();

    register(channel: string, listener: UIRefresherListener): any {
        let channelListener: UIRefresherListener[] | undefined = this.uiRefreshListener.get(channel);
        if (channelListener == undefined) {
            channelListener = [];
            this.uiRefreshListener.set(channel, channelListener);
        }
        channelListener.push(listener);
        console.log('register channelListener: ' + channel + ', new register size: ' + channelListener.length);
    }

    unregister(channel: string, listener: UIRefresherListener): void {
        let channelListener: UIRefresherListener[] | undefined = this.uiRefreshListener.get(channel);
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

    informListener(channel: string) {
        let channelListener = this.uiRefreshListener.get(channel);
        if (channelListener != undefined) {
            channelListener.forEach(listener => {
                console.log("inform ui refresh listener for channel: " + channel);
                listener.updateUI(channel);
            });
        }
    }

}

export const UI_REFRESHER = new UiRfresher();