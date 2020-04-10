import { customElement, html, property, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import {InputfieldComponent, InputfieldType} from '../inputfield/component';
import {
   AlignContent,
   AlignItems,
   ElementState,
   FlexDirection,
   FlexJustifyContent,
   FlexWrap,
   IconComponent,
   SpacerAlignment,
   SpacerSize,
   TypographyType
} from '..';

@customElement('page-icon')
export class PageIconComponent extends PageAbstract {
   @property()
   icon: string = 'thumb_up_alt';

   @property()
   iconSize: number = 96;

   @property()
   elementState: string = ElementState.ACTIVE_FOCUSED;

   @property()
   color: string = '';

   @property()
   clickable: boolean = false;

   getMainComponent(): TemplateResult {
      return html`
         <component-spacer clazz="mediumPaddingTop"></component-spacer>

         <component-flex-container
            .containerClazzes="${["CONTAINER_75"]}"
            .flexJustifyContent="${FlexJustifyContent.FLEX_START}"
            .alignItems="${AlignItems.CENTER}"
         >
            <component-icon
               .clickable="false"
               icon="thumb_up_alt"
               color="#25498d"
               iconSize="96"
               elementState="${ElementState.ACTIVE_UNFOCUSED}"
               .withIconSpace="${false}"
            ></component-icon>

            <component-typography type="${TypographyType.H2}">Icon Component</component-typography>
         </component-flex-container>

         <component-flex-container .containerClazzes="${["CONTAINER_75"]}" itemFlexBasisValue="50%">
            <component-flex-container  itemFlexBasisValue="100%">
               <component-spacer spacerSize="${SpacerSize.MEDIUM}" alignment="${SpacerAlignment.HORIZONTAL}"></component-spacer>
               <component-typography type="${TypographyType.BODY1}"
                  ><i>Icon Component</i> ist eine Komponente mit der man die Google Material Icons in seine Anwendung integrieren
                  kann. Sie basiert auf den Google Material Design Richtlinien:
                  <component-link href="https://material.io/design/iconography/system-icons.html#design-principles"
                     >Google Material Design Richtlinien</component-link
                  >
               </component-typography>
               <component-typography type="${TypographyType.BODY1}"
                  >Eine Übersicht aller Icons kannst du hier finden :
                  <component-link href="https://material.io/resources/icons/?style=baseline"
                     >Google Material Icons</component-link
                  >
               </component-typography>
            </component-flex-container>
            <component-flex-container .containerClazzes="${["CONTAINER_100"]}" itemFlexBasisValue="100%">
               <component-form>
                  <component-inputfield
                     label="Klickbar ?"
                     .inputfieldType="${InputfieldType.CHECKBOX}"
                     @component-inputfield-change="${(event: CustomEvent) => (this.clickable = event.detail.outputData.value)}"
                  ></component-inputfield>
                  <component-inputfield
                     label="Farbe"
                     .inputfieldType="${InputfieldType.COLOR}"
                     @component-inputfield-change="${(event: CustomEvent) => (this.color = event.detail.outputData.value)}"
                  ></component-inputfield>

                  <component-inputfield
                     .required="${true}"
                     label="Größe"
                     .inputfieldType="${InputfieldType.NUMBER}"
                     min="18"
                     max="256"
                     step="1"
                     value="${this.iconSize}"
                     @component-inputfield-change="${(event: CustomEvent) => (this.iconSize = event.detail.outputData.value)}"
                  ></component-inputfield>

                  <component-combobox
                     @component-inputfield-change="${(event: CustomEvent) => (this.elementState = event.detail.value)}"
                     label="Status"
                     selectedValue="${this.elementState}"
                     .options="${InputfieldComponent.clazzToComboboxItems(ElementState)}"
                  ></component-combobox>
               </component-form>

               <component-flex-container .containerClazzes="${["CONTAINER_100"]}">
                  <component-icon
                     icon="sports_motorsports"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="sports_rugby"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="sports_soccer"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="sports_tennis"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="sports_volleyball"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="thumb_down_alt"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="thumb_up_alt"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="whatshot"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="check_box"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="check_box_outline_blank"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="indeterminate_check_box"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="radio_button_checked"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="radio_button_unchecked"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="star"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="star_border"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="star_half"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="toggle_off"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
                  <component-icon
                     icon="toggle_on"
                     clickable="true"
                     @component-icon-click="${(event: CustomEvent) => {
                        this.icon = (<IconComponent>event.detail).icon;
                     }}"
                  ></component-icon>
               </component-flex-container>
            </component-flex-container>

            <component-flex-container
               .containerClazzes=""
               .flexDirection="${FlexDirection.ROW}"
               .flexWrap="${FlexWrap.WRAP}"
               .flexJustifyContent="${FlexJustifyContent.CENTER}"
               .alignItems="${AlignItems.CENTER}"
               .alignContent="${AlignContent.STRETCH}"
               itemFlexBasisValue="auto"
               
               
            >
               <component-icon
                  .clickable="${this.clickable}"
                  icon="${this.icon}"
                  color="${this.color}"
                  .size="${this.iconSize}"
                  .elementState="${this.elementState}"
               ></component-icon>
            </component-flex-container>

            <component-code
               >&lt;component-icon .clickable="${this.clickable}" icon="${this.icon}" color="${this.color}"
               .size="${this.iconSize}" .elementState="$&#123;ElementState.${this.elementState}&#125;" &gt;&lt;/component-icon&gt;
            </component-code>
         </component-flex-container>

         <component-flex-container .containerClazzes="${["CONTAINER_75"]}"> </component-flex-container>
      `;
   }
}
