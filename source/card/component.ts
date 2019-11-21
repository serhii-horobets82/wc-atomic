import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { LinkInputData } from '../link/component';

const componentCSS = require('./component.css');

export class CardInputData extends AbstractInputData {
   thumbnail: string | undefined;
}

@customElement('component-card')
export class CardComponent extends AbstractComponent<CardInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'CardComponent';

   @property()
   thumbnail: string | undefined;

   getDefaultInputData(): CardInputData {
      return <CardInputData>{
         componentIdentifier: CardComponent.IDENTIFIER
      };
   }

   protected inputDataChanged() {}

   render() {
      return html`
         <div class="card basicBorder basicShadow"><slot></slot></div>
      `;
   }

   getOutputData(): undefined {
      return undefined;
   }
}
