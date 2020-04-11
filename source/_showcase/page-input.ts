import { customElement, html, property, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { InputfieldComponent, InputfieldInputData, InputfieldType } from '../inputfield/component';
import { FlexDirection, TypographyType } from '..';
import { ContainerClazzValues, ItemClazzValues } from '../flex-container/component';
import { I18nService } from '@domoskanonos/frontend-basis';

@customElement('page-inputfield')
export class PageInputComponent extends PageAbstract {
   @property()
   type: string = InputfieldType.TEXT;

   @property()
   showLeadingIcon: boolean = true;

   @property()
   showTrailingIcon: boolean = true;

   @property()
   leadingIconClickable: boolean = false;

   @property()
   trailingIconClickable: boolean = false;

   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container
            .containerClazzes="${[
               ContainerClazzValues.CONTAINER_50,
               ContainerClazzValues.TABLET_MAX_WIDTH,
               ContainerClazzValues.SMARTPHONE_MAX_WIDTH,
               ContainerClazzValues.SMARTPHONE_HORIZONTAL_PADDING,
               ContainerClazzValues.TABLET_HORIZONTAL_PADDING
            ]}"
            .itemClazzes="${[ItemClazzValues.KEYLINE_ALIGNMENT_HORIZONTAL, ItemClazzValues.KEYLINE_SIZE_MEDIUM]}"
            itemFlexBasisValue="100%"
         >
            <component-typography .typographyType="${TypographyType.H1}" text="Textfields"></component-typography>
            <component-typography
               .typographyType="${TypographyType.BODY1}"
               text="Text fields let users enter and edit text."
            ></component-typography>
            <component-typography .typographyType="${TypographyType.H4}" text="Interactive demo"></component-typography>
            <component-typography
               .typographyType="${TypographyType.BODY1}"
               text="This demo lets you preview the text field component, its variations, and configuration options. Each tab displays a different type of text field."
            ></component-typography>
         </component-flex-container>

         <component-tabs>
            <component-tab
               slot="tab"
               .selected="${true}"
               text="${I18nService.getUniqueInstance().getValue('demo')}"
            ></component-tab>
            <component-tab slot="tab" text="${I18nService.getUniqueInstance().getValue('source')}"></component-tab>
            <component-tab-content slot="tabContent" .selected="${true}"><component-flex-container
            .containerClazzes="${[
         ContainerClazzValues.CONTAINER_50,
         ContainerClazzValues.TABLET_MAX_WIDTH,
         ContainerClazzValues.SMARTPHONE_MAX_WIDTH,
         ContainerClazzValues.SMARTPHONE_HORIZONTAL_PADDING,
         ContainerClazzValues.TABLET_HORIZONTAL_PADDING
      ]}"
            .itemClazzes="${[ItemClazzValues.KEYLINE_ALIGNMENT_BOTH, ItemClazzValues.KEYLINE_SIZE_MEDIUM]}"
            itemFlexBasisValue="50%"
         >
            <component-form>
               <component-inputfield
                  .inputfieldType="${InputfieldType.COMBOBOX}"
                  .options="${InputfieldComponent.enumToComboboxItems(InputfieldType)}"
                  label="Typ"
                  value="${this.type}"
                  @component-inputfield-change="${(event: CustomEvent) => this.changeType(event)}"
               ></component-inputfield>
               <component-inputfield
                  .inputfieldType="${InputfieldType.CHECKBOX}"
                  label="Trailing Icon"
                  assistiveText="Es besteht die Möglichkeit an jedes Eingabefeld rechts ein Icon zu plazieren."
                  .checked="${this.showTrailingIcon}"
                  @component-inputfield-change="${() => this.switchTrailingIcon()}"
               ></component-inputfield>
               <component-inputfield
                  .inputfieldType="${InputfieldType.CHECKBOX}"
                  label="Trailing Icon"
                  assistiveText="Es besteht die Möglichkeit an jedes Eingabefeld links ein Icon zu plazieren."
                  .checked="${this.showLeadingIcon}"
                  @component-inputfield-change="${() => this.switchLeadingIcon()}"
               ></component-inputfield>
            </component-form>
            <component-form>
               <component-inputfield
                  name="username"
                  .inputfieldType="${this.type}"
                  label="${this.type.toLocaleUpperCase()}"
                  trailingIcon="${this.showTrailingIcon ? 'account_circle' : ''}"
                  leadingIcon="${this.showLeadingIcon ? 'account_circle' : ''}"
                  assistiveText="assistiveText"
                  infoText="infoText"
                  required="true"
               ></component-inputfield>
            </component-form>
         </component-flex-container></component-tab-content>
            <component-tab-content slot="tabContent"><component-code>spodkpofspdofj</component-code></component-tab-content>
         </component-tabs>

         
      `;
   }

   private changeType(event: CustomEvent) {
      let type: string = (<any>InputfieldType)[event.detail.outputData.value];
      console.log('change type: {}', type);
      this.type = type;
   }

   private switchTrailingIcon() {
      this.showTrailingIcon = !Boolean(this.showTrailingIcon);
   }
   private switchLeadingIcon() {
      this.showLeadingIcon = !Boolean(this.showLeadingIcon);
   }
}
