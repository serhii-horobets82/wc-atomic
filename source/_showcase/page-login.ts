import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { HttpClientService } from '@domoskanonos/frontend-basis';

@customElement('page-login')
export class PageLogin extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container
            containerClazz="container_50"
            itemFlexBasisValue="100%"
         >
            <component-authentication
               .isAuthenticated="${HttpClientService.getInstance().isAuthenticated()}"
               loginPath="/dologin"
               logoutPath="/dologout"
            ></component-authentication>
         </component-flex-container>
         
      `;
   }
}
