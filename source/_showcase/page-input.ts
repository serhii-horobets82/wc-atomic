import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputfieldType } from '../inputfield/component';
import { ComboboxOption } from '../combobox/component';

@customElement('page-inputfield')
export class PageInputComponent extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container containerClazz="container_50" itemFlexBasisValue="100%">
         <component-search-bar placeholder="Suche nach allem"></component-search-bar>
            <component-form>
               ${this.createInputfield(InputfieldType.TEXT, 'TEXT', 'account_circle', '')}
               ${this.createInputfield(InputfieldType.PASSWORD, 'PASSWORD', '', '')}
               ${this.createInputfield(InputfieldType.NUMBER, 'NUMBER', '', '')}
               ${this.createInputfield(InputfieldType.TEL, 'TEL', '', '')}
               ${this.createInputfield(InputfieldType.CHECKBOX, 'CHECKBOX', '', '')}
               ${this.createInputfield(InputfieldType.URL, 'URL', '', '')}
               ${this.createInputfield(InputfieldType.EMAIL, 'EMAIL', '', '')}
               ${this.createInputfield(InputfieldType.SEARCH, 'SEARCH', '', '')}
               ${this.createInputfield(InputfieldType.RANGE, 'RANGE', '', '')}
               ${this.createInputfield(InputfieldType.RESET, 'RESET', '', '')}
               ${this.createInputfield(InputfieldType.SUBMIT, 'SUBMIT', '', '')}
               ${this.createInputfield(InputfieldType.TIME, 'TIME', '', '')}
               ${this.createInputfield(InputfieldType.WEEK, 'WEEK', '', '')}
               ${this.createInputfield(InputfieldType.MONTH, 'MONTH', '', '')}
               ${this.createInputfield(InputfieldType.DATE, 'DATE', '', '')}
               ${this.createInputfield(InputfieldType.DATETIME_LOCAL, 'DATETIME_LOCAL', '', '')}
               ${this.createInputfield(InputfieldType.HIDDEN, 'HIDDEN', '', '')}
               ${this.createInputfield(InputfieldType.COLOR, 'COLOR', '', '')}

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

   private createInputfield(type: InputfieldType, labelText: string, trailingIcon: string, leadingIcon: string) {
      return html`
         <component-inputfield
            .inputfieldType="${type}"
            label="${labelText}"
            trailingIcon="${trailingIcon}"
            leadingIcon="${leadingIcon}"
            required="true"
         ></component-inputfield>
      `;
   }
}
