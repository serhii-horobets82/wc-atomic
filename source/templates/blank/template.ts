import {AbstractComponent} from "../../abstract/component/component";
import {TemplateResult} from "lit-html";

export abstract class BlankTemplate extends AbstractComponent<any, any> {

    static IDENTIFIER: string = 'BlanckTemplate';

    render(): TemplateResult {
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

    abstract getContent(): TemplateResult;
}
