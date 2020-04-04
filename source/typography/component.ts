import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {BasicService} from '@domoskanonos/frontend-basis';
import {ElementState} from "..";

export class TypographyType {
   static H1: string = 'H1';
   static H2: string = 'H2';
   static H3: string = 'H3';
   static H4: string = 'H4';
   static H5: string = 'H5';
   static H6: string = 'H6';
   static SUBTITLE1: string = 'SUBTITLE1';
   static SUBTITLE2: string = 'SUBTITLE2';
   static BODY1: string = 'BODY1';
   static BODY2: string = 'BODY2';
   static BUTTON: string = 'BUTTON';
   static CAPTION: string = 'CAPTION';
   static OVERLINE: string = 'OVERLINE';
}

export class TypographyInputData extends AbstractInputData {
   componentIdentifier = TypographyComponent.IDENTIFIER;
   typographyType: string = TypographyType.H2;
   elementState: string = ElementState.DEFAULT;
   text: string = '';
   clazz: string = '';
   cssStyle: string = '';
}

const componentCSS = require('./component.css');

@customElement('component-typography')
export class TypographyComponent extends AbstractComponent<TypographyInputData, undefined> {

   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'Typography';

   @property()
   elementState: string = ElementState.DEFAULT;

   @property()
   typographyType: string = TypographyType.BODY1;

   @property()
   text: string = '';

   @property()
   clazz: string = '';

   @property()
   cssStyle: string = '';

   render() {
      return html`
         <span class="${this.typographyType} ${this.clazz} ${this.elementState}" style="${this.cssStyle}">
            ${this.text}<slot></slot>
         </span>
      `;
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
      let defaultData: TypographyInputData = new TypographyInputData();
      this.text = BasicService.getUniqueInstance().getValue(this.inputData.text, defaultData.text);
      this.typographyType = BasicService.getUniqueInstance().getValue(this.inputData.typographyType, defaultData.typographyType);
      this.elementState = BasicService.getUniqueInstance().getValue(this.inputData.elementState, defaultData.elementState);
      this.cssStyle = BasicService.getUniqueInstance().getValue(this.inputData.cssStyle, defaultData.cssStyle);
      this.clazz = BasicService.getUniqueInstance().getValue(this.inputData.clazz, defaultData.clazz);
   }
}
