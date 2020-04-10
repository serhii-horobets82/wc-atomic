import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { BasicService } from '@domoskanonos/frontend-basis';

export class BorderType {
   static NONE: string = 'NONE';
   static ALL: string = 'ALL';
   static HORIZONTAL: string = 'HORIZONTAL';
   static VERTICAL: string = 'VERTICAL';
   static LEFT: string = 'LEFT';
   static RIGHT: string = 'RIGHT';
   static TOP: string = 'TOP';
   static BOTTOM: string = 'BOTTOM';
   static BOTTOM_SELECTED: string = 'BOTTOM_SELECTED';
}

export class BorderInputData extends AbstractInputData {
   componentIdentifier = BorderComponent.IDENTIFIER;
   borderType: string = BorderType.ALL;
}

const componentCSS = require('./component.css');

@customElement('component-border')
export class BorderComponent extends AbstractComponent<BorderInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'BorderComponent';

   @property()
   borderType: string = BorderType.ALL;

   render() {
      return html`
         <slot class="BORDER ${this.borderType}"></slot>
      `;
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
      let defaultData: BorderInputData = new BorderInputData();
      this.borderType = BasicService.getUniqueInstance().getValue(this.inputData.borderType, defaultData.borderType);
   }
}
