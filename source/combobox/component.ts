import { css, customElement, html, property, query, unsafeCSS } from 'lit-element';
import { guard } from 'lit-html/directives/guard';
import { repeat } from 'lit-html/directives/repeat';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { BasicService } from '@domoskanonos/frontend-basis';

import { KeyValueData } from '../form/component';
import { ElementState } from '..';
import { NotifyType } from '../meta-data/notify-type';

const componentCSS = require('./component.css');

export class ComboboxOption {
   value: string = '';
   text: string = '';

   static enumToComboboxItems(enumeration: any): ComboboxOption[] {
      let options: ComboboxOption[] = [];
      Object.keys(enumeration).forEach((key) => {
         options.push(<ComboboxOption>{ value: key, text: enumeration[key] });
      });
      return options;
   }

   static clazzToComboboxItems(clazz: any): ComboboxOption[] {
      let options: ComboboxOption[] = [];
      Object.keys(clazz).forEach((key) => {
         options.push(<ComboboxOption>{ value: clazz[key], text: key });
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
   size: number = 1;

   @property()
   required: boolean = false;

   @property()
   options: ComboboxOption[] = [];

   @property()
   selectedValue: string = '';

   @query('#selectElement')
   private selectElemet: HTMLSelectElement | undefined;

   render() {
      return html`
      `;
   }

   protected inputDataChanged() {
      this.name = BasicService.getUniqueInstance().getValue(this.inputData.name, '');
      this.size = BasicService.getUniqueInstance().getValue(this.inputData.size, 1);
      this.selectedValue = BasicService.getUniqueInstance().getValue(this.inputData.selectedValue, '');
      this.options = BasicService.getUniqueInstance().getValue(this.inputData.options, <ComboboxOption>{});
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
