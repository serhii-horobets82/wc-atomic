import {css, customElement, html, LitElement, property, unsafeCSS} from 'lit-element';

const componentCSS = require('./component.css');

export class VisibleType {
   static HIDE: string = 'HIDE';
   static INVISIBLE: string = 'INVISIBLE';
   static NORMAL: string = 'NORMAL';
}

@customElement('effect-visible')
export class VisibleEffect extends LitElement {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   @property()
   visibleType: string = VisibleType.HIDE;

   render() {
      return html`
         <div class="${this.visibleType}"><slot></slot></div>
      `;
   }
}
