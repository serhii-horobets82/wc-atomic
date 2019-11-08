import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';

@customElement('page-get-started')
export class PageGetStarted extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container gridClazz="grid_50">
            <component-spacer clazz="maxPaddingTop"></component-spacer>
            <component-h1>
               <component-text slot="header">Base Project</component-text>
            </component-h1>
            <component-text>
                clone base template from github to start your client app
                <component-link href="https://github.com/domoskanonos/wc-atomic-template">https://github.com/domoskanonos/wc-atomic-template</component-link>
            </component-text>
            
            
            
            
         </component-flex-container>
      `;
   }
}
