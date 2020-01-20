import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { SpacerSize, TypographyType } from '..';

const componentCSS = require('./component.css');

export class ChipInputData extends AbstractInputData {
   spacerSize: SpacerSize = SpacerSize.LITTLE;
}

@customElement('component-chip')
export class ChipComponent extends AbstractComponent<ChipInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ChipComponent';

   @property()
   clazz: string = 'primaryColor';

   @property()
   spacerSize: SpacerSize = SpacerSize.LITTLE;

   render() {
      return html`
         <span class="chip ${this.clazz} ${this.spacerSize}">
            <slot></slot>
         </span>
      `;
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
      this.spacerSize = this.inputData.spacerSize;
   }
}
