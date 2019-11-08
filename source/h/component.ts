import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';

const componentCSS = require('./component.css');

export class HInputData extends AbstractInputData {
   headerType?: number;
   headerText?: string;
   subheaderText?: string;
   clazz?: string;
}

export abstract class HComponent extends AbstractComponent<HInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'HComponent';

   @property()
   text: string = '';

   @property()
   subtext: string = '';

   @property()
   clazz: string = '';

   static create(headerType: number): HComponent {
      switch (headerType) {
         case 1:
            return new H1Component();
         case 2:
            return new H2Component();
         case 3:
            return new H3Component();
      }
      return new H1Component();
   }

   static createFromInputData(inputData: HInputData): HComponent {
      let header: HComponent;
      switch (inputData.headerType) {
         case 1:
            header = new H1Component();
            break;
         case 2:
            header = new H2Component();
            break;
         case 3:
            header = new H3Component();
            break;
         default:
            header = new H1Component();
      }
      header.inputData = inputData;
      return header;
   }

   getDefaultInputData(): HInputData {
      return <HInputData>{
         componentIdentifier: H1Component.IDENTIFIER,
         headerType: 1,
         headerText: 'Lorem ipsum dolor sit amet',
         subheaderText: 'Consetetur sadipscing elitr',
         clazz: ''
      };
   }

   getOutputData(): any {
      return undefined;
   }

   protected inputDataChanged() {
      this.clazz = this.basicService.getValue(this.inputData.clazz, '');
      this.text = this.basicService.getValue(this.inputData.headerText, '');
      this.subtext = this.basicService.getValue(this.inputData.subheaderText, '');
   }
}

@customElement('component-h1')
export class H1Component extends HComponent {
   static IDENTIFIER: string = 'H1Component';

   render() {
      return html`
         <div class="headerBox ${this.clazz}">
            <h1 class="header">${this.text}<slot name="header"></slot><slot></slot></h1>
            <h2 class="subheader">${this.subtext}<slot name="subheader"></slot></h2>
         </div>
      `;
   }
}

@customElement('component-h2')
export class H2Component extends HComponent {
   static IDENTIFIER: string = 'H2Component';

   render() {
      return html`
         <div class="headerBox ${this.clazz}">
            <h2 class="header">${this.text}</h2>
            <h3 class="subheader">${this.subtext}</h3>
         </div>
      `;
   }
}

@customElement('component-h3')
export class H3Component extends HComponent {
   static IDENTIFIER: string = 'H3Component';

   render() {
      return html`
         <div class="headerBox ${this.clazz}">
            <h3 class="header">${this.text}</h3>
            <h4 class="subheader">${this.subtext}</h4>
         </div>
      `;
   }
}
