import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from "../../abstract-component/component";
import {CodeInputData} from "./model";

const componentCSS = require('./component.css');

@customElement('component-code')
export class CodeComponent extends AbstractComponent<CodeInputData, undefined> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'CodeComponent';

    @property()
    code: string = '';

    render() {
        return html`<pre>
                <code>${this.code}</code>
            </pre>
`;
    }

    getDefaultInputData(): CodeInputData {
        return <CodeInputData>{code: 'Ein bischen Code muss sein'};
    }

    getOutputData(): undefined {
        return undefined;
    }

    protected inputDataChanged() {
        this.code = this.inputData.code;
    }

}
