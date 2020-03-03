import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import {InputfieldType} from '../inputfield/component';
import {KeyValueData} from "..";

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
               ${this.createInputfield(InputfieldType.TIME, 'TIME', '', '')}
               ${this.createInputfield(InputfieldType.WEEK, 'WEEK', '', '')}
               ${this.createInputfield(InputfieldType.MONTH, 'MONTH', '', '')}
               ${this.createInputfield(InputfieldType.DATE, 'DATE', '', '')}
               ${this.createInputfield(InputfieldType.DATETIME_LOCAL, 'DATETIME_LOCAL', '', '')}
               ${this.createInputfield(InputfieldType.HIDDEN, 'HIDDEN', '', '')}
               ${this.createInputfield(InputfieldType.COLOR, 'COLOR', '', '')}
               ${this.createInputfield(InputfieldType.COMBOBOX, 'COMBOBOX', '', '')}
               ${this.createInputfield(InputfieldType.TEXTAREA, 'TEXTAREA', '', '')}

               <component-inputfield inputfieldType="${InputfieldType.COMBOBOX}"
                  .required="${true}"
                  label="Wähle ein Land aus"
                  selectedValue="de"
                  .options="${[
                     <KeyValueData>{
                        value: '-',
                        key: ''
                     },
                     <KeyValueData>{
                        value: 'Deutschland',
                        key: 'de'
                     },
                     <KeyValueData>{ value: 'England', key: 'en' },
                     <KeyValueData>{ value: 'Frankreich', key: 'fr' }
                  ]}"
               ></component-inputfield>
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
            size="5"
         ></component-inputfield>
      `;
   }
}
