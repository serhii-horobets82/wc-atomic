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
            <component-form>
               <component-inputfield
                  .type="${HTMLInputTypes.TEXT}"
                  label="Benutzername"
                  trailingIcon="account_circle"
                  required="true"
               ></component-inputfield>
               <component-inputfield
                  .type="${HTMLInputTypes.PASSWORD}"
                  label="Passwort"
                  trailingIcon="vpn_key"
                  minlength="8"
                  required="true"
               ></component-inputfield>
               <component-inputfield
                  .type="${HTMLInputTypes.WEEK}"
                  leadingIcon="thumb_up_alt"
                  trailingIcon="thumb_down_alt"
                  label="Week"
               ></component-inputfield>
               <component-inputfield .type="${HTMLInputTypes.DATETIME_LOCAL}" label="Datetime_Local"></component-inputfield>
               <component-inputfield .type="${HTMLInputTypes.DATE}" label="Date"></component-inputfield>
               <component-inputfield .type="${HTMLInputTypes.TEL}" label="Telefon"></component-inputfield>
               <component-inputfield .type="${HTMLInputTypes.CHECKBOX}" label="Checkbox"></component-inputfield>
               <component-inputfield .type="${HTMLInputTypes.COLOR}" label="Color"></component-inputfield>
               <component-inputfield .type="${HTMLInputTypes.EMAIL}" label="Email"></component-inputfield>
               <component-inputfield .type="${HTMLInputTypes.FILE}" label="File"></component-inputfield>
               <component-inputfield .type="${HTMLInputTypes.IMAGE}" label="Image"></component-inputfield>
               <component-inputfield .type="${HTMLInputTypes.MONTH}" label="Month"></component-inputfield>
               <component-inputfield .type="${HTMLInputTypes.NUMBER}" label="Number"></component-inputfield>
               <component-search></component-search>
               <component-textarea label="Dein Text"></component-textarea>
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
               <component-datalist></component-datalist>
            </component-form>
         </component-flex-container>
      `;
   }
}
