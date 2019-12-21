import { css, customElement, html, LitElement, property, unsafeCSS } from 'lit-element';

const componentCSS = require('./component.css');

@customElement('component-hover')
export class HoverComponent extends LitElement {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   render() {
      return html`
         <div><slot></slot></div>
      `;
   }
}
