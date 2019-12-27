import { customElement, html, property, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import {
   AlignContent,
   AlignItems,
   FlexDirection,
   FlexJustifyContent,
   FlexWrap,
   KeylineAlignment,
   KeylineSize
} from '../flex-container/component';
import { ComboboxOption } from '../combobox/component';
import { SpacerSize, TypographyTypes } from '..';

@customElement('page-layout')
export class PageLayoutComponent extends PageAbstract {
   @property()
   itemFlexBasisValue: string = 'auto';
   @property()
   direction: string = FlexDirection.ROW;

   @property()
   wrap: string = FlexWrap.WRAP;

   @property()
   justifyContent: string = FlexJustifyContent.FLEX_START;

   @property()
   alignItems: string = AlignItems.STRETCH;

   @property()
   alignContent: string = AlignContent.STRETCH;

   @property()
   keylineAlignment: string = KeylineAlignment.BOTH;

   @property()
   keylineSize: string = KeylineSize.LITTLE;

   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container containerClazz="container_75" .keylineSize="${KeylineSize.MEDIUM}" itemFlexBasisValue="50%">
            <component-flex-container .keylineSize="${KeylineSize.MEDIUM}" itemFlexBasisValue="100%">
               <component-typography type="${TypographyTypes.H2}">Seiten-Layout</component-typography>
               <component-typography type="${TypographyTypes.BODY1}"
                  ><i>Component Flex Container</i> basiert auf dem HTML 5 Flex Contaier Layout (display: flex). Auf dieser Seite
                  können Sie die Komponente und deren Attribute ausführlich testen. Sie können das Ergebnis Ihrer Auswahl in der
                  Beispielkomponente begutachten, sowie den zugehörigen Quelltext anschauen.</component-typography
               >
            </component-flex-container>

            <component-form>
               <component-combobox
                  .options="${ComboboxOption.enumToComboboxItems(FlexDirection)}"
                  label="FlexDirection"
                  selectedValue="${this.direction}"
                  @combobox-selection-change="${(event: CustomEvent) => this.changeFlexDirection(event)}"
               ></component-combobox>

               <component-combobox
                  .options="${ComboboxOption.enumToComboboxItems(FlexWrap)}"
                  label="FlexWrap"
                  selectedValue="${this.wrap}"
                  @combobox-selection-change="${(event: CustomEvent) => this.changeFlexWrap(event)}"
               ></component-combobox>

               <component-combobox
                  .options="${ComboboxOption.enumToComboboxItems(FlexJustifyContent)}"
                  label="FlexJustifyContent"
                  selectedValue="${this.justifyContent}"
                  @combobox-selection-change="${(event: CustomEvent) => this.changeFlexJustify(event)}"
               ></component-combobox>

               <component-combobox
                  .options="${ComboboxOption.enumToComboboxItems(AlignItems)}"
                  label="AlignItems"
                  selectedValue="${this.alignItems}"
                  @combobox-selection-change="${(event: CustomEvent) => this.changeAlignItems(event)}"
               ></component-combobox>

               <component-combobox
                  .options="${ComboboxOption.enumToComboboxItems(AlignContent)}"
                  label="AlignContent"
                  selectedValue="${this.alignContent}"
                  @combobox-selection-change="${(event: CustomEvent) => this.changeAlignContent(event)}"
               ></component-combobox>

               <component-inputfield
                  value="${this.itemFlexBasisValue}"
                  @component-inputfield-change="${(event: CustomEvent) => this.changeItemFlexBasis(event)}"
               ></component-inputfield>

               <component-combobox
                  .options="${ComboboxOption.enumToComboboxItems(KeylineAlignment)}"
                  label="KeylineAlignment"
                  selectedValue="${this.basicService.getEnumKey(this.keylineAlignment, KeylineAlignment)}"
                  @combobox-selection-change="${(event: CustomEvent) => this.changeKeylineAlignment(event)}"
               ></component-combobox>

               <component-combobox
                  .options="${ComboboxOption.enumToComboboxItems(KeylineSize)}"
                  label="KeylineSize"
                  selectedValue="${this.basicService.getEnumKey(this.keylineSize, KeylineSize)}"
                  @combobox-selection-change="${(event: CustomEvent) => this.changeKeylineSize(event)}"
               ></component-combobox>
            </component-form>

            <component-flex-container
               containerClazz=""
               itemFlexBasisValue="${this.itemFlexBasisValue}"
               .direction="${this.direction}"
               .wrap="${this.wrap}"
               .justifyContent="${this.justifyContent}"
               .keylineAlignment="${this.keylineAlignment}"
               .alignItems="${this.alignItems}"
               .alignContent="${this.alignContent}"
               .keylineSize="${this.keylineSize}"
            >
               <component-spacer
                  cssStyle="width:200px; height: 200px; background-color:var(--app-color-primary)"
               ></component-spacer>
               <component-spacer
                  cssStyle="width:200px; height: 100px; background-color:var(--app-color-secondary)"
               ></component-spacer>
               <component-spacer
                  cssStyle="width:100px; height: 200px; background-color:var(--app-color-primary)"
               ></component-spacer>
               <component-spacer
                  cssStyle="width:200px; height: 200px; background-color:var(--app-color-primary)"
               ></component-spacer>
               <component-spacer
                  cssStyle="width:100px; height: 100px; background-color:var(--app-color-primary)"
               ></component-spacer>
               <component-spacer
                  cssStyle="width:50px; height: 50px; background-color:var(--app-color-primary)"
               ></component-spacer>

               <component-spacer
                  .size="${SpacerSize.BIG}"
                  cssStyle="background-color:var(--app-color-primary)"
               ></component-spacer>

               <component-spacer
                  .size="${SpacerSize.BIG}"
                  cssStyle="background-color:var(--app-color-primary)"
               ></component-spacer>

               <component-spacer
                  .size="${SpacerSize.BIG}"
                  cssStyle="background-color:var(--app-color-primary)"
               ></component-spacer>
            </component-flex-container>

            <component-code
               >&lt;component-flex-container containerClazz=""
               .direction="$&#123;FlexDirection.${this.basicService.getEnumKey(this.direction, FlexDirection)}&#125;"
               .wrap="$&#123;FlexWrap.${this.basicService.getEnumKey(this.wrap, FlexWrap)}&#125;"
               .justifyContent="$&#123;FlexJustifyContent.${this.basicService.getEnumKey(
                  this.justifyContent,
                  FlexJustifyContent
               )}&#125;"
               .alignItems="$&#123;AlignItems.${this.basicService.getEnumKey(this.alignItems, AlignItems)}&#125;"
               .alignContent="$&#123;AlignContent.${this.basicService.getEnumKey(this.alignContent, AlignContent)}&#125;"
               itemFlexBasisValue="${this.itemFlexBasisValue}"
               .keylineSize="$&#123;KeylineSize.${this.basicService.getEnumKey(this.keylineSize, KeylineSize)}&#125;"
               .keylineAlignment="$&#123;KeylineAlignment.${this.basicService.getEnumKey(
                  this.keylineAlignment,
                  KeylineAlignment
               )}&#125;"
               &gt; &lt;/component-tab-content&gt;
            </component-code>
         </component-flex-container>
      `;
   }

   private changeKeylineAlignment(event: CustomEvent) {
      this.keylineAlignment = (<any>KeylineAlignment)[event.detail.value];
      console.log(this.keylineAlignment);
   }

   private changeKeylineSize(event: CustomEvent) {
      this.keylineSize = (<any>KeylineSize)[event.detail.value];
   }

   private changeFlexDirection(event: CustomEvent) {
      this.direction = (<any>FlexDirection)[event.detail.value];
   }

   private changeFlexWrap(event: CustomEvent) {
      this.wrap = (<any>FlexWrap)[event.detail.value];
   }

   private changeFlexJustify(event: CustomEvent) {
      this.justifyContent = (<any>FlexJustifyContent)[event.detail.value];
   }

   private changeAlignItems(event: CustomEvent) {
      this.alignItems = (<any>AlignItems)[event.detail.value];
   }

   private changeAlignContent(event: CustomEvent) {
      this.alignContent = (<any>AlignContent)[event.detail.value];
   }

   private changeItemFlexBasis(event: CustomEvent) {
      this.itemFlexBasisValue = event.detail.outputData.value;
      console.log(this.itemFlexBasisValue);
   }
}
