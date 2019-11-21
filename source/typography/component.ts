import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';

const componentCSS = require('./component.css');

export enum TypographyTypes {
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

export class TypographyInputData extends AbstractInputData {
   componentIdentifier = TypographyComponent.IDENTIFIER;
   type: TypographyTypes = TypographyTypes.H2;
   text?: string;
   clazz?: string;
   cssStyle?: string;
   title?: string;
}

@customElement('component-typography')
export class TypographyComponent extends AbstractComponent<TypographyInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'HComponent';

   @property()
   type: TypographyTypes = TypographyTypes.BODY1;

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
            <span class="${this.type.toString()}">${this.text}<slot></slot></span>
      `;
   }

   getDefaultInputData(): TypographyInputData {
      return <TypographyInputData>{
         componentIdentifier: TypographyComponent.IDENTIFIER,
         type: TypographyTypes.BODY1,
         text: 'Lorem ipsum dolor sit amet',
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

