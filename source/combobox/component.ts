import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { guard } from 'lit-html/directives/guard';
import { repeat } from 'lit-html/directives/repeat';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';

import { KeyValueData } from '../form/component';
import {TypographyTypes} from "..";

const componentCSS = require('./component.css');

export class ComboboxOption {
   value: string = '';
   text: string = '';
   selected: boolean = false;

   static enumToComboboxItems(enumeration: any): ComboboxOption[] {
      let options: ComboboxOption[] = [];
      Object.keys(enumeration).forEach(key => {
         options.push(<ComboboxOption>{value: key, text: enumeration[key]});
      });
      return options;
   }

}

export class ComboboxInputData extends AbstractInputData {
   name: string = '';
   label: string = '';
   size: number = 1;
   cssStyle: string = '';
   selectedValue: string = '';
   options: ComboboxOption[] = [];
}

@customElement('component-combobox')
export class ComboboxComponent extends AbstractComponent<ComboboxInputData, KeyValueData> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ComboboxComponent';

   static EVENT_SELECTION_CHANGE: string = 'combobox-selection-change';

   @property()
   name: string = '';

   @property()
   label: string = '';

   @property()
   size: number = 1;

   @property()
   options: ComboboxOption[] = [];

   @property()
   selectedValue: string = '';

   @property()
   cssStyle: string = '';

   protected inputDataChanged() {
      this.name = this.basicService.getValue(this.inputData.name, '');
      this.label = this.basicService.getValue(this.inputData.label, '');
      this.cssStyle = this.basicService.getValue(this.inputData.cssStyle, '');
      this.size = this.basicService.getValue(this.inputData.size, 1);
      this.selectedValue = this.basicService.getValue(this.inputData.selectedValue, '');
      this.options = this.basicService.getValue(this.inputData.options, <ComboboxOption>{});
   }

   render() {
      return html`
         <component-typography .type="${TypographyTypes.CAPTION}">${this.label}</component-typography><select
            name="${this.name}"
            style="${this.cssStyle}"
            size="${this.size}"
            @change="${(event: Event) => this.onChange(event)}"
         >
            ${guard(
               [this.options],
               () => html`
                  ${repeat(
                     this.options,
                     (option) => option.value,
                     (option) =>
                        this.basicService.isEqual(this.selectedValue, option.value)
                           ? html`
                                <option value="${option.value}" selected>${option.text}</option>
                             `
                           : html`
                                <option value="${option.value}">${option.text}</option>
                             `
                  )}
               `
            )}
         </select>
      `;
   }

   private onChange(event: Event) {
      let selectElement: HTMLSelectElement | null = <HTMLSelectElement>event.target;
      this.selectedValue = selectElement != null ? selectElement.value : '';
      console.log('selected value change, new value: '.concat(this.selectedValue));
      this.dispatchSimpleCustomEvent(ComboboxComponent.EVENT_SELECTION_CHANGE, this.getOutputData());
   }

   getOutputData(): KeyValueData {
      return <KeyValueData>{
         key: this.name,
         value: this.selectedValue
      };
   }

   getDefaultInputData(): ComboboxInputData {
      return <ComboboxInputData>{
         componentIdentifier: ComboboxComponent.IDENTIFIER,
         name: 'combobox',
         size: 1,
         options: <ComboboxOption[]>[
            { value: 'value1', text: 'Eintrag 1' },
            {
               value: 'value2',
               text: 'Eintrag 2'
            },
            { value: 'value3', text: 'Eintrag 3' }
         ]
      };
   }

   getEventList(): string[] {
      return [ComboboxComponent.EVENT_SELECTION_CHANGE];
   }
}
