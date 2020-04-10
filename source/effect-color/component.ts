import {css, customElement, html, LitElement, property, unsafeCSS} from 'lit-element';
import {BasicService} from '@domoskanonos/frontend-basis';

export class ColorScheme {
   static PRIMARY_COLOR: string = 'PRIMARY_COLOR';
   static SECONDARY_COLOR: string = 'SECONDARY_COLOR';
   static SURFACE_COLOR: string = 'SURFACE_COLOR';
   static BACKGROUND_COLOR: string = 'BACKGROUND_COLOR';
}

export class TextColorClazz {
   static DEFAULT: string = 'DEFAULT';
   static SUCCESS: string = 'SUCCESS';
   static ERROR: string = 'ERROR';
   static WARNING: string = 'WARNING';
   static INFO: string = 'INFO';
   static ACTIVE: string = 'ACTIVE';
}

export class BackgroundColorClazz {
   static DEFAULT: string = 'DEFAULT';
   static ERROR: string = 'ERROR';
}

const componentCSS = require('./component.css');

@customElement('effect-color')
export class ColorEffect extends LitElement {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ColorComponent';

   @property()
   colorScheme: string = ColorScheme.BACKGROUND_COLOR;

   @property()
   textColorClazz: string = TextColorClazz.DEFAULT;

   @property()
   backgroundColorClazz: string = BackgroundColorClazz.DEFAULT;

   @property()
   textColor: string = '';

   @property()
   backgroundColor: string = '';

   render() {
      return html`
         <slot
            class="${this.colorScheme} ${this.textColorClazz} ${this.backgroundColorClazz}"
            style="${BasicService.getUniqueInstance().isNotBlank(this.textColor)
          ? 'color: '.concat(this.textColor).concat(';')
          : ''}${BasicService.getUniqueInstance().isNotBlank(this.backgroundColor)
          ? 'background-color: '.concat(this.backgroundColor).concat(';')
          : ''}"
         ></slot>
      `;
   }
}
