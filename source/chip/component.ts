import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';

const componentCSS = require('./component.css');

export class ChipInputData extends AbstractInputData {
    componentIdentifier = ChipComponent.IDENTIFIER;
}

@customElement('component-chip')
export class ChipComponent extends AbstractComponent<ChipInputData, undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'ChipComponent';

    @property()
    clazz: string = 'primaryColor';

    render() {
        return html`
         <span class="${this.clazz}"><slot></slot></span>        
      `;
    }

    getDefaultInputData(): any {
        return <ChipComponent>{};
    }

    getOutputData(): undefined {
        return undefined;
    }

    protected inputDataChanged() {
    }
}
