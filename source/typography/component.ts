import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';

const componentCSS = require('./component.css');

export class TypographyTypes {
   static H1 = 'H1';
   static H2 = 'H2';
   static H3 = 'H3';
   static H4 = 'H4';
   static H5 = 'H5';
   static H6 = 'H6';
   static SUBTITLE1 = 'SUBTITLE1';
   static SUBTITLE2 = 'SUBTITLE2';
   static BODY1 = 'BODY1';
   static BODY2 = 'BODY2';
   static BUTTON = 'BUTTON';
   static CAPTION = 'CAPTION';
   static OVERLINE = 'OVERLINE';
}

export class TypographyInputData extends AbstractInputData {
   componentIdentifier = TypographyComponent.IDENTIFIER;
   type: string = TypographyTypes.H2;
   text?: string;
   clazz?: string;
   cssStyle?: string;
   title?: string;
}

export class MessageType {
   static DEFAULT: string = '';
   static SUCCESS: string = 'success';
   static ERROR: string = 'error';
   static WARNING: string = 'warning';
   static INFO: string = 'info';
}

@customElement('component-typography')
export class TypographyComponent extends AbstractComponent<TypographyInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'HComponent';

   @property()
   type: string = TypographyTypes.BODY1;

   @property()
   text: string = '';

   @property()
   title: string = '';

   @property()
   clazz: string = '';

   @property()
   cssStyle: string = '';

   @property()
   messageType: string = MessageType.DEFAULT;

   render() {
      return html`
         <span class="${this.type.toString()} ${this.clazz} ${this.messageType}" style="${this.cssStyle}"
            >${this.text}<slot></slot
         ></span>
      `;
   }

   getDefaultInputData(): TypographyInputData {
      return <TypographyInputData>{
         componentIdentifier: TypographyComponent.IDENTIFIER,
         type: TypographyTypes.BODY1,
         text: 'Lorem ipsum dolor sit amet'
      };
   }

   getOutputData(): any {
      return undefined;
   }

   protected inputDataChanged() {
      this.text = this.basicService.getValue(this.inputData.text, '');
      this.cssStyle = this.basicService.getValue(this.inputData.cssStyle, '');
      this.clazz = this.basicService.getValue(this.inputData.clazz, '');
      this.title = this.basicService.getValue(this.inputData.title, '');
      this.type = this.basicService.getValue(this.inputData.type, TypographyTypes.BODY1);
   }
}
