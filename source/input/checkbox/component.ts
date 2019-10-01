import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {KeyValueOutputData} from '../../organisms/form/component';
import {CheckboxInputData} from "./model";

const componentCSS = require('./component.css');

@customElement('component-checkbox')
export class CheckboxComponent extends AbstractComponent<
   CheckboxInputData,
   KeyValueOutputData
> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'CheckboxComponent';

   static EVENT_VALUE_CHANGE: string = 'component-checkbox-value-change';

   @property()
   protected name: string |undefined;

   @property()
   private checked: boolean|undefined;

   render() {
      return html`
         <span class="checkboxContainer"
            ><span
               class="checkbox ${this.checked ? 'checked' : ''}"
               @click="${this.valueChange}"
            ></span
         ></span>
      `;
   }

   async valueChange(event: Event) {
      console.info(event.target)
      this.checked = !this.checked;
      this.dispatchSimpleCustomEvent(CheckboxComponent.EVENT_VALUE_CHANGE);
   }

   getDefaultInputData(): CheckboxInputData {
      return <CheckboxInputData>{
         componentIdentifier: CheckboxComponent.IDENTIFIER,
         name: 'checkbox'
      };
   }

   protected inputDataChanged() {
      this.name = this.inputData.name;
      this.checked =
         this.inputData.checked !== undefined ? this.inputData.checked : false;
   }

   getOutputData(): KeyValueOutputData {
      return <KeyValueOutputData>{
         key: this.name,
         value: this.checked
      };
   }

   getEventList(): string[] {
      return [CheckboxComponent.EVENT_VALUE_CHANGE];
   }
}
