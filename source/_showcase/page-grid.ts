import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';

@customElement('page-grid')
export class PageGrid extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-grid-container
            .gridTemplateRows="${['200px', '1fr', '200px']}"
            .gridTemplateColumns="${['200px', '1fr', '200px']}"
         >
            <component-icon icon="menu"></component-icon>
            <component-icon icon="menu"></component-icon>
            <component-icon icon="menu"></component-icon>
            <component-icon icon="menu"></component-icon>
            <component-icon icon="menu"></component-icon>
            <component-icon icon="menu"></component-icon>
            <component-icon icon="menu"></component-icon>
         </component-grid-container>
      `;
   }
}
