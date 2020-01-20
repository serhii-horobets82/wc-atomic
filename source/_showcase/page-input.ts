import { customElement, html, property, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputfieldType, InputfieldComponent } from '../inputfield/component';
import { SimpleTableRowData } from '../simple-table/component';
import { ComboboxOption } from '../combobox/component';
import { IconInputData, InputBoxInputData, SpacerAlignment, SpacerSize, TypographyType } from '..';

@customElement('page-inputfield')
export class PageInputComponent extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container containerClazz="container_50" itemFlexBasisValue="100%">
            <component-form>
               <component-inputbox>
                  <component-inputfield
                     .inputfieldType="${InputfieldType.TEXT}"
                     label="Benutzername"
                     .inputBoxInputData="${<InputBoxInputData>{
                        labelText: 'Benutzername',
                        trailingIcon: <IconInputData>{ icon: 'account_circle' }
                     }}"
                     required="true"
                  ></component-inputfield>
               </component-inputbox>

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
            </component-form>
         </component-flex-container>
      `;
   }
}
