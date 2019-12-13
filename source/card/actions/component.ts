import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from "../..";

const componentCSS = require('./component.css');

export class CardActionInputData extends AbstractInputData {
}

@customElement('component-card-actions')
export class CardActionComponent extends AbstractComponent<CardActionInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'CardActionComponent';

   render() {
      return html`<div><slot></slot></div>`;
   }

   getDefaultInputData(): CardActionInputData {
      return <CardActionInputData>{};
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
   }

}
