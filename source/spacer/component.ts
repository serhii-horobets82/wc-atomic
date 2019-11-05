import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';

const componentCSS = require('./component.css');

export class SpacerInputData extends AbstractInputData {
   clazz?: string;
}

@customElement('component-spacer')
export class SpacerComponent extends AbstractComponent<SpacerInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'SpacerComponent';

   @property()
   clazz: string = '';

   render() {
      return html`
         <div class="${this.clazz}"><slot></slot></div>
      `;
   }

   getDefaultInputData(): any {
      return <SpacerInputData>{ clazz: '' };
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
      this.clazz = this.basicService.getValue(this.inputData.clazz, '');
   }
}
