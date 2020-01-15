import { css, customElement, html, property, query, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { FormComponent, FormComponentOutputData } from '../form/component';
import { HttpClientService } from '@domoskanonos/frontend-basis';
import { HTMLInputTypes, TypographyTypes } from '..';

const componentCSS = require('./component.css');

export class ChangePasswordInputData extends AbstractInputData {
   changePasswordPath: string = '';
}

@customElement('component-change-password')
export class ChangePasswordComponent extends AbstractComponent<ChangePasswordInputData, FormComponentOutputData> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ChangePasswordComponent';

   static EVENT_CHANGE_PASSWORD: string = 'component-change-password';

   constructor() {
      super();
   }

   @property()
   changePasswordPath: string = '';

   @query('#change-password-form')
   formComponent: FormComponent | undefined;

   render() {
      return html`
         <component-card>
            <component-form id="change-password-form">
               <component-typography .type="${TypographyTypes.H4}"
                  >${this.getI18NValue('component_change_password')}</component-typography
               >
               <component-inputfield
                  .type="${HTMLInputTypes.PASSWORD}"
                  label="${this.getI18NValue('component_change_password_current_password')}"
                  trailingIcon="vpn_key"
                  minlength="8"
                  required="true"
                  name="password_current"
               ></component-inputfield>
               <component-inputfield
                  .type="${HTMLInputTypes.PASSWORD}"
                  label="${this.getI18NValue('component_change_password_new_password')}"
                  trailingIcon="vpn_key"
                  minlength="8"
                  required="true"
                  name="password_new"
               ></component-inputfield>
               <component-inputfield
                  .type="${HTMLInputTypes.PASSWORD}"
                  label="${this.getI18NValue('component_change_password_repeat_new_password')}"
                  trailingIcon="vpn_key"
                  minlength="8"
                  required="true"
                  name="password_new_repeat"
               ></component-inputfield>
               <component-button
                  text="${this.getI18NValue('component_change_password_submit')}"
                  @click="${() => this.changePassword()}"
               ></component-button>
            </component-form>
         </component-card>
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

   private logout() {
      this.dispatchSimpleCustomEvent(ChangePasswordComponent.EVENT_CHANGE_PASSWORD, this.getOutputData());
   }

   protected inputDataChanged() {
   }

   getOutputData(): FormComponentOutputData {
      return this.formComponent != undefined ? this.formComponent.getOutputData() : FormComponentOutputData.prototype;
   }

   getEventList(): string[] {
      return [ChangePasswordComponent.EVENT_CHANGE_PASSWORD];
   }

}
