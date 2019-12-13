import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';

const componentCSS = require('./component.css');

export class RippleInputData extends AbstractInputData {
    componentIdentifier = RippleComponent.IDENTIFIER;
}

@customElement('component-ripple')
export class RippleComponent extends AbstractComponent<RippleInputData, undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'ChipComponent';

    render() {
        return html`<div><slot></slot></div>`;
    }

    getDefaultInputData(): any {
        return <RippleComponent>{};
    }

    getOutputData(): undefined {
        return undefined;
    }

    protected inputDataChanged() {
    }
}
