import { css, customElement, html, property, query, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { FormComponent, FormComponentOutputData } from '../form/component';
import { HTMLInputTypes, TypographyTypes } from '..';

const componentCSS = require('./component.css');

export class RegisterInputData extends AbstractInputData {}

@customElement('component-register')
export class RegisterComponent extends AbstractComponent<RegisterInputData, FormComponentOutputData> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'RegisterComponent';
   static EVENT_SUBMIT: string = 'component-register-submit';

   constructor() {
      super();
   }

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
                  @component-button-click="${() => this.register()}"
               ></component-button>
            </component-form>
         </component-card>
      `;
   }

   private register() {
      if (this.formComponent?.validate()) {
         this.dispatchSimpleCustomEvent(RegisterComponent.EVENT_SUBMIT, this.getOutputData());
      }
   }

   protected inputDataChanged() {}

   getOutputData(): FormComponentOutputData {
      if (this.formComponent?.isValid()) {
         let formOutputData: FormComponentOutputData = this.formComponent.getOutputData();
         return formOutputData;
      }
      return FormComponentOutputData.prototype;
   }

   getEventList(): string[] {
      return [RegisterComponent.EVENT_SUBMIT];
   }
}
