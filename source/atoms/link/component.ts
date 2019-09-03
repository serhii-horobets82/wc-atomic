import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from "../../abstract/abstract-component";
import {Link} from "../../interface/atoms";

const componentCSS = require('./component.css');

@customElement('component-link')
export class LinkComponent extends AbstractComponent<Link, undefined> {

    static styles = css`${unsafeCSS(componentCSS)}`;

    static IDENTIFIER: string = 'LinkComponent';

    @property()
    href: string;

    @property()
    text: string;

    render() {
        return html`<a href="${this.href}">${this.text}</a>`;
    }

    protected inputDataChanged() {
        this.href = this.inputData.href;
        this.text = this.inputData.text;
    }

    getDefaultInputData(): Link {
        return <Link>{componentIdentifier: LinkComponent.IDENTIFIER, text: 'Home', href: '/'};
    }

    getOutputData(): undefined {
        return undefined;
    }


}
