import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {FormComponent, FormComponentOutputData} from '../form/component';
import {HttpClientService} from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');

export class ChangePasswordInputData extends AbstractInputData {
   changePasswordPath: string = '';
}

@customElement('component-change-password')
export class ChangePasswordComponent extends AbstractComponent<ChangePasswordInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ChangePasswordComponent';

   constructor() {
      super();
   }

   @property()
   changePasswordPath: string = '';

   @query('#change-password-form')
   formComponent: FormComponent | undefined;

   render() {
      return html`
         <component-form id="change-password-form">
            <component-inputfield
               type="password"
               name="password_current"
               placeholder="${this.getI18NValue('component_change_password_current_password')}"
            ></component-inputfield>
            <component-inputfield
               type="password"
               name="password_new"
               placeholder="${this.getI18NValue('component_change_password_new_password')}"
            ></component-inputfield>
            <component-inputfield
               type="password"
               name="password_new_repeat"
               placeholder="${this.getI18NValue('component_change_password_repeat_new_password')}"
            ></component-inputfield>
            <component-button
               text="${this.getI18NValue('component_change_password_submit')}"
               @click="${() => this.changePassword()}"
            ></component-button>
         </component-form>
      `;
   }

   private changePassword() {
      if (this.formComponent != null) {
         let formOutputData: FormComponentOutputData = this.formComponent.getOutputData();
         let registerPromise = HttpClientService.getInstance().sendFormData(this.changePasswordPath, formOutputData.formData);
         registerPromise
             .then((response: Response) => {
                console.log('password changed: ' + response);
             })
             .catch((reason: string) => {
                console.log('change password failure, reason: ' + reason);
             });
      }

   }


   protected inputDataChanged() {
   }

   getDefaultInputData(): ChangePasswordInputData {
      return <ChangePasswordInputData>{
         componentIdentifier: ChangePasswordComponent.IDENTIFIER
      }
   }

   getOutputData(): any {
      return undefined;
   }

}
