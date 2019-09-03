import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {TextfieldComponent} from '../textfield/component';
import {ComponentLoader} from '../../abstract/component-loader';
import {FormElementInputData} from "./model";

const componentCSS = require('./component.css');

@customElement('component-form-label')
export class FormElementComponent extends AbstractComponent<
   FormElementInputData,
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

   getDefaultInputData(): FormElementInputData {
      return <FormElementInputData>{
         componentIdentifier: FormElementComponent.IDENTIFIER,
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
