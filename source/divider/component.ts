import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {SpacerAlignment, SpacerSize} from '..';
import { BasicService } from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');

export class DividerInputData extends AbstractInputData {
    componentIdentifier = DividerComponent.IDENTIFIER;
    spacerSize: SpacerSize = SpacerSize.MEDIUM;
}

@customElement('component-divider')
export class DividerComponent extends AbstractComponent<DividerInputData, undefined> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'DividerComponent';

    @property()
    spacerSize: SpacerSize = SpacerSize.MEDIUM;

    render() {
        return html`
         <component-spacer spacerSize="${this.spacerSize}" spacerAlignment="${SpacerAlignment.BOTH}"> </component-spacer>
         <div class="basicBorder basicBorderBottom"></div>
         <component-spacer spacerSize="${this.spacerSize}" spacerAlignment="${SpacerAlignment.BOTH}"> </component-spacer>
      `;
    }

    getDefaultInputData(): any {
        return <DividerInputData>{};
    }

    getOutputData(): undefined {
        return undefined;
    }

    protected inputDataChanged() {
        this.spacerSize = BasicService.getUniqueInstance().getValue(this.inputData.spacerSize, this.spacerSize);
    }
}
