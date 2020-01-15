import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {FormComponent, FormComponentOutputData} from '../form/component';
import {HTMLInputTypes, TypographyTypes} from '..';

const componentCSS = require('./component.css');

export class ResetPasswordInputData extends AbstractInputData {
   resetPasswordPath: string = '';
}

@customElement('component-reset-password')
export class ResetPasswordComponent extends AbstractComponent<ResetPasswordInputData, FormComponentOutputData> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ResetPasswordComponent';

   static EVENT_RESET_PASSWORD: string = 'component-reset-password-event';

   constructor() {
      super();
   }

   @property()
   changePasswordPath: string = '';

   @query('#reset-password-form')
   formComponent: FormComponent | undefined;

   render() {
      return html`
         <component-card>
            <component-form id="reset-password-form">
               <component-typography .type="${TypographyTypes.H4}"
                  >${this.getI18NValue('component_reset_password_header')}</component-typography
               >
               <slot></slot>
               <component-inputfield
                  .type="${HTMLInputTypes.EMAIL}"
                  label="${this.getI18NValue('component_reset_password_email')}"
                  trailingIcon="vpn_key"
                  minlength="8"
                  required="true"
                  name="password_current"
               ></component-inputfield>
               <component-button
                  text="${this.getI18NValue('component_reset_password_submit')}"
                  @click="${() => this.resetPassword()}"
               ></component-button>
            </component-form>
         </component-card>
      `;
   }

   private resetPassword() {
      if (this.formComponent != null && this.formComponent.isValid()) {
         this.dispatchSimpleCustomEvent(ResetPasswordComponent.EVENT_RESET_PASSWORD, this.getOutputData());
      }

   }

   protected inputDataChanged() {
   }

   getOutputData(): FormComponentOutputData {
      return this.formComponent != undefined ? this.formComponent.getOutputData() : FormComponentOutputData.prototype;
   }

   getEventList(): string[] {
      return [ResetPasswordComponent.EVENT_RESET_PASSWORD];
   }


}