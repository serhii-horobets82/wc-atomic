import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';

@customElement('page-get-started')
export class PageGetStarted extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container gridClazz="grid_50">
            <component-spacer clazz="maxPaddingTop"></component-spacer>
            <component-typography1>
               <component-typography slot="header">Base Project</component-typography>
            </component-typography1>
            <component-typography>
               clone base template from github to start your client app
               <component-link href="https://github.com/domoskanonos/wc-atomic-template"
                  >https://github.com/domoskanonos/wc-atomic-template</component-link
               >
            </component-typography>
         </component-flex-container>
      `;
   }
}
