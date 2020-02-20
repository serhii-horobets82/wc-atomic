import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import { BasicService } from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');

export class SpacerAlignment {
   static BOTH: string = '';
   static HORIZONTAL: string = 'horizontalAlignment';
   static VERTICAL: string = 'verticalAlignment';
}

export class SpacerSize {
   static ZERO: string = '';
   static LITTLE: string = 'spaceLittle';
   static SMALL: string = 'spaceSmall';
   static MEDIUM: string = 'spaceMedium';
   static BIG: string = 'spaceBig';
   static MAX: string = 'spaceMax';
}

export class SpacerInputData extends AbstractInputData {
   size: string = SpacerSize.ZERO;
   spacerAlignment: string = SpacerAlignment.BOTH;
}

@customElement('component-spacer')
export class SpacerComponent extends AbstractComponent<SpacerInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'SpacerComponent';

   @property()
   cssStyle: string = '';

   @property()
   spacerSize: string = SpacerSize.ZERO;

   @property()
   spacerAlignment: string = SpacerAlignment.BOTH;

   render() {
      return html`
         <span class="spacer ${this.spacerSize} ${this.spacerAlignment}" style="${this.cssStyle}"><slot></slot></span>
      `;
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
      this.spacerSize = BasicService.getUniqueInstance().getValue(this.inputData.size, SpacerSize.ZERO);
      this.spacerAlignment = BasicService.getUniqueInstance().getValue(this.inputData.spacerAlignment, SpacerAlignment.BOTH);
   }
}
