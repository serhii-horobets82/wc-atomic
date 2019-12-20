import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { HTMLInputTypes, InputComponent } from '../input/component';
import { SimpleTableRowData } from '../simple-table/component';
import { ComboboxOption } from '../combobox/component';
import { SpacerAlignment, SpacerSize, TypographyTypes } from '..';

@customElement('page-inputfield')
export class PageInputComponent extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container containerClazz="container_50" itemFlexBasisValue="100%">
            <component-inputfield .type="${HTMLInputTypes.TEXT}" label="Text"></component-inputfield>
            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
            <component-inputfield .type="${HTMLInputTypes.WEEK}" label="Week"></component-inputfield>
            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
            <component-inputfield .type="${HTMLInputTypes.DATETIME_LOCAL}" label="Datetime_Local"></component-inputfield>
            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
            <component-inputfield .type="${HTMLInputTypes.DATE}" label="Date"></component-inputfield>
            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
            <component-inputfield .type="${HTMLInputTypes.BUTTON}" label="Button"></component-inputfield>
            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
            <component-inputfield .type="${HTMLInputTypes.CHECKBOX}" label="Checkbox"></component-inputfield>
            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
            <component-inputfield .type="${HTMLInputTypes.COLOR}" label="Color"></component-inputfield>
            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
            <component-inputfield .type="${HTMLInputTypes.EMAIL}" label="Email"></component-inputfield>
            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
            <component-inputfield .type="${HTMLInputTypes.FILE}" label="File"></component-inputfield>
            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
            <component-inputfield .type="${HTMLInputTypes.IMAGE}" label="Image"></component-inputfield>
            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
            <component-inputfield .type="${HTMLInputTypes.MONTH}" label="Month"></component-inputfield>
            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
            <component-inputfield .type="${HTMLInputTypes.NUMBER}" label="Number"></component-inputfield>
            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
            <component-search></component-search>
            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
            <component-textarea></component-textarea>
            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
            <component-combobox
               .required="${true}"
               label="Wähle ein Land aus"
               selectedValue="de"
               .options="${[
                  <ComboboxOption>{
                     text: '-',
                     value: ''
                  },
                  <ComboboxOption>{
                     text: 'Deutschland',
                     value: 'de'
                  },
                  <ComboboxOption>{ text: 'England', value: 'en' },
                  <ComboboxOption>{ text: 'Frankreich', value: 'fr' }
               ]}"
            ></component-combobox>
            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
            <component-datalist></component-datalist>
            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
         </component-flex-container>
      `;
   }
}
