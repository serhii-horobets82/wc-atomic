import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from "../..";

const componentCSS = require('./component.css');

export class CardSupportingTextInputData extends AbstractInputData {
}

@customElement('component-card-supporting-text')
export class CardSupportingTextComponent extends AbstractComponent<CardSupportingTextInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'CardSupportingTextComponent';

   render() {
      return html`<div><slot></slot></div>`;
   }

   getDefaultInputData(): CardSupportingTextInputData {
      return <CardSupportingTextInputData>{};
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
   }
   
}
