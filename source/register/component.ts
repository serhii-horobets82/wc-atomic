import { css, customElement, html, property, query, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { FormComponent, FormComponentOutputData } from '../form/component';
import { HttpClientService } from '@domoskanonos/frontend-basis';
import { HTMLInputTypes, TypographyTypes } from '..';

const componentCSS = require('./component.css');

export class RegisterInputData extends AbstractInputData {
   registerPath: string = '';
}

@customElement('component-register')
export class RegisterComponent extends AbstractComponent<RegisterInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'RegisterComponent';

   constructor() {
      super();
   }

   @property()
   registerPath: string = '';

   @query('#register-form')
   formComponent: FormComponent | undefined;

   render() {
      return html`
         <component-card>
            <component-form id="register-form">
               <component-typography .type="${TypographyTypes.H4}"
                  >${this.getI18NValue('component_register')}</component-typography
               >
               <component-inputfield
                  name="username"
                  .type="${HTMLInputTypes.EMAIL}"
                  label="${this.getI18NValue('component_register_username')}"
                  trailingIcon="account_circle"
                  required="true"
               ></component-inputfield>
               <component-inputfield
                  .type="${HTMLInputTypes.PASSWORD}"
                  label="${this.getI18NValue('component_register_password')}"
                  name="password"
                  trailingIcon="vpn_key"
                  minlength="8"
                  required="true"
               ></component-inputfield>
               <component-button
                  text="${this.getI18NValue('component_register_submit')}"
                  @click="${() => this.register()}"
               ></component-button>
            </component-form>
         </component-card>
      `;
   }

   private register() {
      if (this.formComponent != null) {
         let formOutputData: FormComponentOutputData = this.formComponent.getOutputData();
         let registerPromise = HttpClientService.getInstance().sendFormData(this.registerPath, formOutputData.formData);
         registerPromise
            .then((response: Response) => {
               console.log('registrered: ' + response);
            })
            .catch((reason: string) => {
               console.log('authenitcate failure, reason: ' + reason);
            });
      }
   }

   protected inputDataChanged() {}

   getDefaultInputData(): RegisterInputData {
      return <RegisterInputData>{
         componentIdentifier: RegisterComponent.IDENTIFIER
      };
   }

   getOutputData(): any {
      return undefined;
   }
}
