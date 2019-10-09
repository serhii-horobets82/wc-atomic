export type RouteListener = (relUrl: string) => void;
export type Unsubscribe = () => void;

export class Router {
    private listeners: RouteListener[] = [];
    private path: string;

    constructor() {

        window.onpopstate = () => {
            this.path = document.location.hash;
            this.notifyListeners();
        };

        document.addEventListener('click', (event: MouseEvent) => {
            if (!this.shouldIgnoreEvent(event)) {
                let anchor = this.getAnchor(event); // a-Element ermitteln
                if (anchor && !this.shouldIgnoreAnchor(anchor)) { // nur interne Links
                    event.preventDefault();
                    if (anchor.hash.length > 0) {
                        this.navigate(anchor.hash);
                    }
                }
            }
        });

        this.path = document.location.hash;

    }

    subscribe(listener: RouteListener): Unsubscribe {
        this.listeners.push(listener);
        return () => { // unsubscribe function
            this.listeners = this.listeners.filter(other => other !== listener);
        };
    }

    navigate(relUrl: string) {
        if(this.path === relUrl){
            console.log('you are already on page: ' + relUrl);
            return;
        }
        console.debug('navigate path:' + relUrl);
        history.pushState(null, '', relUrl);
        this.path = relUrl;
        this.notifyListeners();
    }

    getPath() {
        return this.path;
    }

    private notifyListeners() {
        const path = this.getPath();
        this.listeners.forEach(listener => listener(path));
    }

    private shouldIgnoreEvent(event: MouseEvent) {
        return (event.defaultPrevented || event.button !== 0 ||
            (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey));
    }

    private getAnchor(event: MouseEvent): HTMLAnchorElement {
        for (let target of event.composedPath ? event.composedPath() : []) {
            if (this.isAnchor(target as HTMLElement)) {
                return target as HTMLAnchorElement;
            }
        }
        let elem: any = event.target;
        while (elem && !this.isAnchor(elem)) {
            elem = elem.parentNode;
        }
        return (elem && this.isAnchor(elem)) ? elem : null;
    }

    private isAnchor(elem: HTMLElement) {
        return elem.nodeName && elem.nodeName.toLowerCase() === 'a';
    }

    private shouldIgnoreAnchor(anchor: HTMLAnchorElement) {
        if (anchor.target && anchor.target.toLowerCase() !== '_self') {
            return true; // it has a non-default target
        }

        if (anchor.hasAttribute('download')) {
            return true;
        }

        const origin = anchor.origin || this.getAnchorOrigin(anchor);
        if (origin !== window.location.origin) {
            return true; // target is external to the app
        }

        return false;
    }

    private getAnchorOrigin(anchor: HTMLAnchorElement) {
        const port = anchor.port;
        const protocol = anchor.protocol;
        const defaultHttp = protocol === 'http:' && port === '80';
        const defaultHttps = protocol === 'https:' && port === '443';
        const host = (defaultHttp || defaultHttps) ? anchor.hostname : anchor.host;
        return `${protocol}//${host}`;
    }


}

export const router = new Router();
