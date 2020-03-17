import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputfieldType } from '../inputfield/component';
import { KeyValueData } from '..';

@customElement('page-inputfield')
export class PageInputComponent extends PageAbstract {
   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container .containerClazzes="${['CONTAINER_50']}" itemFlexBasisValue="100%">
            <component-search-bar placeholder="Suche nach allem"></component-search-bar>
            <component-form>
            
             <component-inputfield
                       name="username"
                       .inputfieldType="${InputfieldType.EMAIL}"
                       label="${this.getI18NValue('component_authentication_username')}"
                       trailingIcon="account_circle"
                       required="true"
                    ></component-inputfield>
                    <component-inputfield
                       .inputfieldType="${InputfieldType.PASSWORD}"
                       label="${this.getI18NValue('component_authentication_password')}"
                       name="password"
                       trailingIcon="vpn_key"
                       required="true"
                    ></component-inputfield>
            
               <component-inputfield
                  inputfieldType="${InputfieldType.COMBOBOX}"
                  .required="${true}"
                  label="Wähle ein Land aus"
                  value="de"
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

               <component-inputfield
                  inputfieldType="${InputfieldType.COMBOBOX}"
                  .required="${true}"
                  label="Wähle mehrere Früchte aus"
                  value="${['apfel', 'birne']}"
                  .multiple="${true}"
                  .options="${[
                     <KeyValueData>{
                        value: '-',
                        key: ''
                     },
                     <KeyValueData>{
                        value: 'Apfel',
                        key: 'apfel'
                     },
                     <KeyValueData>{ value: 'Birne', key: 'birne' },
                     <KeyValueData>{
                        value: 'Mango',
                        key: 'mango'
                     },
                     <KeyValueData>{ value: 'Kiwi', key: 'kiwi' },
                     <KeyValueData>{ value: 'Traube', key: 'traube' }
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
