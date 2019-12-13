import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../..';

const componentCSS = require('./component.css');

export class CardPrimaryTitleInputData extends AbstractInputData {}

@customElement('component-card-primary-title')
export class CardPrimaryTitleComponent extends AbstractComponent<CardPrimaryTitleInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'CardActionComponent';

   render() {
      return html`
               <div><slot></slot></div>
      `;
   }

   getDefaultInputData(): CardPrimaryTitleInputData {
      return <CardPrimaryTitleInputData>{};
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {}
}
