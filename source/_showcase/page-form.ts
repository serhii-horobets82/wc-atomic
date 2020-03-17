import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';

@customElement('page-form')
export class PageFormComponent extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container .containerClazzes="${["CONTAINER_50"]}" itemFlexBasisValue="100%">
            <component-authentication loginPath="/dologin"></component-authentication>
            <component-register></component-register>
            <component-change-password registerPath="/AUTH/CP"></component-change-password>
         </component-flex-container>
      `;
   }
}
