import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';

const componentCSS = require('./component.css');

export class ElementListInputData extends AbstractInputData {
   componentIdentifier = ElementListComponent.IDENTIFIER;
}

@customElement('component-element-list')
export class ElementListComponent extends AbstractComponent<ElementListInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ElementListComponent';

   render() {
      return html`
         <header>
            <slot></slot>
         </header>
      `;
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {}
}
