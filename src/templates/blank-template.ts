import {AbstractPage} from "./abstract-page";

export class BlankTemplate extends AbstractPage {

    static IDENTIFIER: string = 'BlanckTemplate';

    render() {
        return this.getContent();
    }


}
