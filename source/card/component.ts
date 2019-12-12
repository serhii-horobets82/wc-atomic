import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {FlexComponent, RichMediaComponent, PrimaryTitleComponent, TypographyComponent} from '..';

const componentCSS = require('./component.css');

export class CardActionArea {
   static CARD: string = 'CARD';
   static RICH_MEDIA_ACTIONS: string = 'RICH_MEDIA_ACTIONS';
}

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
   cardActionArea: string = CardActionArea.CARD;

   render() {
      return html`
         <div class="card basicBorder basicShadow">
            <slot></slot>
         </div>
      `;
   }

   getDefaultInputData(): CardInputData {
      return new CardInputData();
   }

   protected inputDataChanged() {
   }

   getOutputData(): undefined {
      return undefined;
   }
}
