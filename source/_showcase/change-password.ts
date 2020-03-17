import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';

@customElement('page-change-password')
export class PageChangePassword extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container
            .containerClazzes="${["CONTAINER_50"]}"
            itemFlexBasisValue="100%"
         >
            <component-change-password></component-change-password>
         </component-flex-container>
      `;
   }
}
