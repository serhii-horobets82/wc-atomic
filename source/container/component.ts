import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';

const componentCSS = require('./component.css');

export class ContainerInputData extends AbstractInputData {
    componentIdentifier = ContainerComponent.IDENTIFIER;
}

@customElement('component-container')
export class ContainerComponent extends AbstractComponent<ContainerInputData, undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'ContainerComponent';

    @property()
    rendered: boolean = true;

    render() {
        return this.rendered ? html`<div><slot></slot></div>` : html``;
    }

    getDefaultInputData(): any {
        return <ContainerInputData>{};
    }

    getOutputData(): undefined {
        return undefined;
    }

    protected inputDataChanged() {
    }
}
