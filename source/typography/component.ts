import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { BasicService } from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');

export class TypographyType {
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

export class MessageType {
   static DEFAULT: string = '';
   static SUCCESS: string = 'success';
   static ERROR: string = 'error';
   static WARNING: string = 'warning';
   static INFO: string = 'info';
}

export class TypographyInputData extends AbstractInputData {
   componentIdentifier = TypographyComponent.IDENTIFIER;
   typographyType: string = TypographyType.H2;
   text: string = '';
   clazz: string = '';
   cssStyle: string = '';
   title: string = '';
}

@customElement('component-typography')
export class TypographyComponent extends AbstractComponent<TypographyInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'HComponent';

   @property()
   messageType: string = MessageType.DEFAULT;

   @property()
   typographyType: string = TypographyType.BODY1;

   @property()
   text: string = '';

   @property()
   title: string = '';

   @property()
   clazz: string = '';

   @property()
   cssStyle: string = '';

   render() {
      return html`
         <span class="${this.typographyType.toString()} ${this.clazz} ${this.messageType}" style="${this.cssStyle}"
            >${this.text}<slot></slot
         ></span>
      `;
   }

   getDefaultInputData(): TypographyInputData {
      return <TypographyInputData>{
         componentIdentifier: TypographyComponent.IDENTIFIER,
         typographyType: TypographyType.BODY1,
         text: 'Lorem ipsum dolor sit amet'
      };
   }

   getOutputData(): any {
      return undefined;
   }

   protected inputDataChanged() {
      let defaultData: TypographyInputData = new TypographyInputData();
      this.text = BasicService.getInstance().getValue(this.inputData.text, defaultData.text);
      this.cssStyle = BasicService.getInstance().getValue(this.inputData.cssStyle, defaultData.cssStyle);
      this.clazz = BasicService.getInstance().getValue(this.inputData.clazz, defaultData.clazz);
      this.title = BasicService.getInstance().getValue(this.inputData.title, defaultData.title);
      this.typographyType = BasicService.getInstance().getValue(this.inputData.typographyType, defaultData.typographyType);
   }
}
