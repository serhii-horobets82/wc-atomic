import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/abstract-component';
import {TextfieldComponent} from '../textfield/component';
import {ComponentLoader} from '../../abstract/component-loader';
import {FormElement} from "../../interface/atoms";

const componentCSS = require('./component.css');

@customElement('component-form-label')
export class FormLabelComponent extends AbstractComponent<
   FormElement,
   undefined
> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'FormLabelComponent';

   @property()
   label: string;

   @property()
   component: AbstractComponent<any, any>;

   render() {
      return html`
         <div class="formElement">
            <label>
               ${this.label}
            </label>
            ${this.component}
         </div>
      `;
   }

   getDefaultInputData(): FormElement {
      return <FormElement>{
         componentIdentifier: FormLabelComponent.IDENTIFIER,
         label: 'formLabel',
         componentData: new TextfieldComponent().getDefaultInputData()
      };
   }

   protected inputDataChanged() {
      this.label = this.inputData.label;
      this.component = ComponentLoader.INSTANCE.createComponentFromInputData(
         this.inputData.componentData
      );
   }

   getOutputData(): any {
      return this.component.getOutputData();
   }
}
