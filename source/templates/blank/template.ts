import {Template} from "../../abstract/template/template";
import {html} from "lit-html";

export class BlankTemplate extends Template<any, any> {

    initTemplateData() {
        return {};
    }

    static IDENTIFIER: string = 'BlanckTemplate';

    render() {
        return this.getContent();
    }

    getDefaultInputData(): any {
        return undefined;
    }

    getOutputData(): any {
        return undefined;
    }

    inputDataChanged(): void {
    }

}