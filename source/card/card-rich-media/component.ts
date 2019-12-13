import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from "../..";

const componentCSS = require('./component.css');

export class CardRichMediaInputData extends AbstractInputData {
}

@customElement('component-card-rich-media')
export class CardRichMediaComponent extends AbstractComponent<CardRichMediaInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'CardRichMediaComponent';

   render() {
      return html`<div><slot></slot></div>`;
   }

   getDefaultInputData(): CardRichMediaInputData {
      return <CardRichMediaInputData>{};
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
   }

}
