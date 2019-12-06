import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';

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
   alignment: string = SpacerAlignment.BOTH;
}

@customElement('component-spacer')
export class SpacerComponent extends AbstractComponent<SpacerInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'SpacerComponent';

   @property()
   size: string = SpacerSize.ZERO;

   @property()
   alignment: string = SpacerAlignment.BOTH;

   render() {
      return html`
         <div class="${this.size} ${this.alignment}"><slot></slot></div>
      `;
   }

   getDefaultInputData(): any {
      return <SpacerInputData>{size: SpacerSize.ZERO, alignment: SpacerAlignment.BOTH};
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
      this.size = this.basicService.getValue(this.inputData.size, SpacerSize.ZERO);
      this.alignment = this.basicService.getValue(this.inputData.alignment, SpacerAlignment.BOTH);
   }
}
