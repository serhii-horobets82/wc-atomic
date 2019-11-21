import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';

const componentCSS = require('./component.css');

export class DividerInputData extends AbstractInputData {
    componentIdentifier = DividerComponent.IDENTIFIER;
    clazz?: string;
}

@customElement('component-divider')
export class DividerComponent extends AbstractComponent<DividerInputData, undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'DividerComponent';

    @property()
    clazz: string = '';

    render() {
        return html`
         <div class="${this.clazz}"><slot></slot></div>
      `;
    }

    getDefaultInputData(): any {
        return <DividerInputData>{clazz: ''};
    }

    getOutputData(): undefined {
        return undefined;
    }

    protected inputDataChanged() {
        this.clazz = this.basicService.getValue(this.inputData.clazz, '');
    }
}
