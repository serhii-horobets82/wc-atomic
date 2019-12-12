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

    render() {
        return html`
         <div>CHIP Componenten: NOT IMPLEMENTED YET</div>
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
