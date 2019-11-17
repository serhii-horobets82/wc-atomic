import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';

const componentCSS = require('./component.css');

export enum HTypes {
   H1 = 'H1',
   H2 = 'H2',
   H3 = 'H3',
   H4 = 'H4',
   H5 = 'H5',
   H6 = 'H6',
   SUBTITLE1 = 'SUBTITLE1',
   SUBTITLE2 = 'SUBTITLE2',
   BODY1 = 'BODY1',
   BODY2 = 'BODY2',
   BUTTON = 'BUTTON',
   CAPTION = 'CAPTION',
   OVERLINE = 'OVERLINE'
}

export class HInputData extends AbstractInputData {
   hType: HTypes = HTypes.H2;
   text?: string;
}

@customElement('component-h')
export class HComponent extends AbstractComponent<HInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'HComponent';

   @property()
   hType: HTypes = HTypes.H2;

   @property()
   text: string = '';

   render() {
      return html`
            <span class="${this.hType.toString()}">${this.text}<slot></slot></span>
      `;
   }

   getDefaultInputData(): HInputData {
      return <HInputData>{
         componentIdentifier: HComponent.IDENTIFIER,
         hType: HTypes.H2,
         text: 'Lorem ipsum dolor sit amet',
      };
   }

   getOutputData(): any {
      return undefined;
   }

   protected inputDataChanged() {
      this.text = this.basicService.getValue(this.inputData.text, '');
   }
}

