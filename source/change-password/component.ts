import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {FormComponent, FormComponentOutputData} from '../form/component';
import {I18nService} from '@domoskanonos/frontend-basis';
import {InputfieldType, TypographyType} from '..';

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

   @property()
   errorMessage: string = '';

   @query('#change-password-form')
   formComponent: FormComponent | undefined;

   @query('#current-password-inputfield')
   currentPasswordInputField: HTMLInputElement | undefined;

   @query('#new-password-inputfield')
   newPasswordInputField: HTMLInputElement | undefined;

   @query('#repeat-new-password-inputfield')
   repeatNewPasswordInputField: HTMLInputElement | undefined;

   render() {
      return html`
         <component-card>
            <component-form id="change-password-form">
               <component-typography slot="header" .typographyType="${TypographyType.H4}"
                  >${this.getI18NValue('component_change_password')}</component-typography
               >
               <component-inputfield
                  id="current-password-inputfield"
                  .inputfieldType="${InputfieldType.PASSWORD}"
                  label="${this.getI18NValue('component_change_password_current_password')}"
                  trailingIcon="vpn_key"
                  required="true"
                  name="password_current"
               ></component-inputfield>
               <component-inputfield
                  id="new-password-inputfield"
                  .inputfieldType="${InputfieldType.PASSWORD}"
                  label="${this.getI18NValue('component_change_password_new_password')}"
                  trailingIcon="vpn_key"
                  minlength="8"
                  required="true"
                  name="password_new"
               ></component-inputfield>
               <component-inputfield
                  id="repeat-new-password-inputfield"
                  .inputfieldType="${InputfieldType.PASSWORD}"
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

               <component-typography slot="errorMessages" .typographyType="${TypographyType.OVERLINE}" text="${this.errorMessage}"
                  ></component-typography>
               
            </component-form>
         </component-card>
      `;
   }

   private changePassword() {
      this.errorMessage = '';
      if (this.newPasswordInputField?.value != this.repeatNewPasswordInputField?.value) {
         this.errorMessage = I18nService.getUniqueInstance().getValue("component_change_password_error_samepasswordcheck");
      } else if (this.currentPasswordInputField?.value == this.newPasswordInputField?.value) {
         this.errorMessage = I18nService.getUniqueInstance().getValue("component_change_password_error_samepasswordcheck_current_new");
      } else if (this.formComponent != null && this.formComponent.isValid()) {
         this.dispatchSimpleCustomEvent(ChangePasswordComponent.EVENT_CHANGE_PASSWORD, this.getOutputData());
      }
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
