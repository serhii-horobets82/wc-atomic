import {customElement, html, TemplateResult} from 'lit-element';
import {PageAbstract} from './page-abstract';

@customElement('page-register')
export class PageRegister extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container
            containerClazz="container_50"
            itemFlexBasisValue="100%"
         >
            <component-register></component-register>
         </component-flex-container>
      `;
   }
}
