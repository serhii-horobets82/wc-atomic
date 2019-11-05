import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';

const componentCSS = require('./component.css');

export class CodeInputData extends AbstractInputData {
   code?: string;
}

@customElement('component-code')
export class CodeComponent extends AbstractComponent<CodeInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'CodeComponent';

   @property()
   code: string = '';

   render() {
      return html`
         <pre>
                <code>${this.code}</code>
            </pre
         >
      `;
   }

   getDefaultInputData(): CodeInputData {
      return <CodeInputData>{ code: 'Ein bischen Code muss sein' };
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
      this.code = this.basicService.getValue(this.inputData.code, '');
   }
}
