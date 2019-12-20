import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { TypographyInputData, TypographyTypes } from '../typography/component';

@customElement('page-get-started')
export class PageGetStarted extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container containerClazz="container_50" itemFlexBasisValue="100%">
            <component-spacer clazz="maxPaddingTop"></component-spacer>
            <component-typography .type="${TypographyTypes.H2}">Base Project</component-typography>
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
