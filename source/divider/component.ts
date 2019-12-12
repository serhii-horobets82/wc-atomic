import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';

const componentCSS = require('./component.css');

export class DividerInputData extends AbstractInputData {
    componentIdentifier = DividerComponent.IDENTIFIER;
}

@customElement('component-divider')
export class DividerComponent extends AbstractComponent<DividerInputData, undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'DividerComponent';

    render() {
        return html`
         <div class="basicBorderBottom"></div>
      `;
    }

    getDefaultInputData(): any {
        return <DividerInputData>{};
    }

    getOutputData(): undefined {
        return undefined;
    }

    protected inputDataChanged() {
    }
}
