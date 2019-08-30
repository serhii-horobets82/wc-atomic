import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from "../../abstract/abstract-component";
import {AbstractInputData} from "../../interface/atoms";

const componentCSS = require('./code.scss');

export interface Code extends AbstractInputData {
    code: string;
}

@customElement('component-code')
export class CodeComponent extends AbstractComponent<Code, undefined> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'CodeComponent';

    @property()
    code: string;

    render() {
        return html`<pre>
                <code>${this.code}</code>
            </pre>
`;
    }

    getDefaultInputData(): Code {
        return <Code>{code: 'Ein bischen Code muss sein'};
    }

    getOutputData(): undefined {
        return undefined;
    }

    protected inputDataChanged() {
        this.code = this.inputData.code;
    }

}
