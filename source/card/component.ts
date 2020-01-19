import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { FlexComponent, RichMediaComponent, PrimaryTitleComponent, TypographyComponent, CardPrimaryTitleComponent } from '..';
import { SlotService } from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');

export class CardInputData extends AbstractInputData {
   componentIdentifier = CardComponent.IDENTIFIER;
}

@customElement('component-card')
export class CardComponent extends AbstractComponent<CardInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'CardComponent';

   @property()
   clazz : string = '';

   render() {
      return html`
         <div class="card basicBorder basicShadow ${this.clazz}">
            <slot></slot>
         </div>
      `;
   }

   getDefaultInputData(): CardInputData {
      return new CardInputData();
   }

   protected inputDataChanged() {}

   getOutputData(): undefined {
      return undefined;
   }
}
