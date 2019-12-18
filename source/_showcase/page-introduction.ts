import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { ComboboxOption, HTMLInputTypes, SpacerSize, TypographyTypes } from '..';
import { SpacerAlignment } from '../spacer/component';

@customElement('page-introduction')
export class PageIntroduction extends PageAbstract {
   getTopContent(): TemplateResult {
      return html`
         <component-top-app-bar>
            <component-spacer slot="leftComponents" clazz="mediumPaddingLeft"></component-spacer>
            <component-icon slot="leftComponents" icon="menu" clickable="true"></component-icon>
            <component-spacer
               slot="leftComponents"
               size="${SpacerSize.SMALL}"
               alignment="${SpacerAlignment.HORIZONTAL}"
            ></component-spacer>
            <component-typography slot="leftComponents" type="${TypographyTypes.H6}">Introduction</component-typography>
            <component-icon slot="rightComponents" icon="search" clickable="true"></component-icon>
            <component-search slot="prominentComponents"></component-search>
         </component-top-app-bar>
      `;
   }

   getMainComponent(): TemplateResult {
      return html`
         <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>

         <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>

         <component-flex-container containerClazz="container_50" itemFlexBasisValue="100%">
            <component-inputfield .type="${HTMLInputTypes.TEXT}" placeholder="Text"></component-inputfield>

            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>

            <component-inputfield .type="${HTMLInputTypes.WEEK}" placeholder="Week"></component-inputfield>

            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>

            <component-inputfield .type="${HTMLInputTypes.DATETIME_LOCAL}" placeholder="Datetime_Local"></component-inputfield>

            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>

            <component-inputfield .type="${HTMLInputTypes.DATE}" placeholder="Date"></component-inputfield>

            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>

            <component-inputfield .type="${HTMLInputTypes.BUTTON}" placeholder="Button"></component-inputfield>

            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>

            <component-inputfield .type="${HTMLInputTypes.CHECKBOX}" placeholder="Checkbox"></component-inputfield>

            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>

            <component-inputfield .type="${HTMLInputTypes.COLOR}" placeholder="Color"></component-inputfield>

            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>

            <component-inputfield .type="${HTMLInputTypes.EMAIL}" placeholder="Email"></component-inputfield>

            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>

            <component-inputfield .type="${HTMLInputTypes.FILE}" placeholder="File"></component-inputfield>

            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>

            <component-inputfield .type="${HTMLInputTypes.IMAGE}" placeholder="Image"></component-inputfield>

            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>

            <component-inputfield .type="${HTMLInputTypes.MONTH}" placeholder="Month"></component-inputfield>

            <component-spacer size="${SpacerSize.BIG}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>

            <component-inputfield .type="${HTMLInputTypes.NUMBER}" placeholder="Number"></component-inputfield>

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
