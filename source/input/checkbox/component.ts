import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {CheckboxInputData} from "./model";
import {baseHelper} from "../../util/base";
import {KeyValueOutputData} from "../../organisms/form/model";

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
   protected name: string = '';

   @property()
   private checked: boolean = false;

   @property()
   private text: string = '';


   render() {
      return html`
         <span class="checkboxContainer"
            ><span
               class="checkbox ${this.checked ? 'checked' : ''}"
               @click="${this.valueChange}"
            ></span
         >
         ${this.text}
         <slot></slot>
         </span>
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
      this.name = baseHelper.getValue(this.inputData.name, '');
      this.checked = baseHelper.getValue(this.inputData.checked, false);
      this.text = baseHelper.getValue(this.inputData.text, '');
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
