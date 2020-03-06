import {customElement, html, TemplateResult} from 'lit-element';
import {PageAbstract} from './page-abstract';
import {HttpClientService} from '@domoskanonos/frontend-basis';
import {FormComponentOutputData} from "..";

@customElement('page-register')
export class PageRegister extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container
            .containerClazzes="${["CONTAINER_50"]}
            itemFlexBasisValue="100%"
         >
            <component-register @component-register-submit="${(event: CustomEvent) => this.register(event)}"></component-register>
         </component-flex-container>
      `;
   }

   private register(event: CustomEvent) {
      let formOutputData: FormComponentOutputData = event.detail;
      let registerPromise = HttpClientService.getUniqueInstance().sendFormData("/AUTH/REGISTER", formOutputData.formData);
      registerPromise
          .then((response: Response) => {
             console.log('registrered: ' + response);
          })
          .catch((reason: string) => {
             console.log('authenitcate failure, reason: ' + reason);
          });
   }
}
