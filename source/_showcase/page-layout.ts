import {customElement, html, property, TemplateResult} from 'lit-element';
import {PageAbstract} from './page-abstract';
import {TypographyTypes} from '../typography/component';
import {
    AlignContent,
    AlignItems,
    FlexDirection,
    FlexJustifyContent,
    FlexWrap,
    KeylineAlignment,
    KeylineSize
} from '../flex-container/component';
import {ComboboxOption} from '../combobox/component';

@customElement('page-layout')
export class PageLayoutComponent extends PageAbstract {
    @property()
    direction: FlexDirection = FlexDirection.ROW;

    @property()
    wrap: FlexWrap = FlexWrap.WRAP;

    @property()
    justifyContent: FlexJustifyContent = FlexJustifyContent.FLEX_START;

    @property()
    alignItems: AlignItems = AlignItems.STRETCH;

    @property()
    alignContent: AlignContent = AlignContent.STRETCH;

    @property()
    keylineAlignment: KeylineAlignment = KeylineAlignment.BOTH;

    @property()
    keylineSize: KeylineSize = KeylineSize.LITTLE;

    getMainComponent(): TemplateResult {
        return html`
         <component-flex-container containerClazz="container_75" .keylineSize="${KeylineSize.MEDIUM}" itemFlexBasisValue="50%">
            <component-flex-container .keylineSize="${KeylineSize.MEDIUM}" itemFlexBasisValue="100%">
               <component-typography type="${TypographyTypes.H2}">Seiten-Layout</component-typography>
               <component-typography type="${TypographyTypes.BODY1}"
                  ><i>Component Flex Container</i> basiert auf dem HTML 5 Flex Contaier Layout (display: flex).
                  Auf dieser Seite können Sie die Komponente und deren Attribute ausführlich testen.
                  Sie können das Ergebnis Ihrer Auswahl in der Beispielkomponente begutachten,
                  sowie den zugehörigen Quelltext anschauen.</component-typography
               >


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
 

               <component-combobox
                  .options="${ComboboxOption.enumToComboboxItems(FlexDirection)}"
                  label="FlexDirection"
                  selectedValue="${this.basicService.getEnumKey(this.direction, FlexDirection)}"
                  @combobox-selection-change="${(event: CustomEvent) => this.changeFlexDirection(event)}"
               ></component-combobox>
               
               <component-combobox
                  .options="${ComboboxOption.enumToComboboxItems(FlexWrap)}"
                  label="FlexWrap"
                  selectedValue="${this.basicService.getEnumKey(this.wrap, FlexWrap)}"
                  @combobox-selection-change="${(event: CustomEvent) => this.changeFlexWrap(event)}"
               ></component-combobox>
 
                <component-combobox
                  .options="${ComboboxOption.enumToComboboxItems(FlexJustifyContent)}"
                  label="FlexJustifyContent"
                  selectedValue="${this.basicService.getEnumKey(this.justifyContent, FlexJustifyContent)}"
                  @combobox-selection-change="${(event: CustomEvent) => this.changeFlexJustifyContent(event)}"
               ></component-combobox>
              
               
            </component-flex-container>
            
            

            <component-tabs>
               <component-tab slot="tab" selected="true" tabContentId="resultContent">Result</component-tab>
               <component-tab-content slot="tabContent" id="resultContent" selected="true">
                  <component-flex-container
                     containerClazz="surfaceColor"
                     .direction="${this.direction}"
                     .wrap="${this.wrap}"
                     .justifyContent="${this.justifyContent}"
                     .keylineAlignment="${this.keylineAlignment}"
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
                        cssStyle="width:200px; height: 200px; background-color:var(--app-color-primary)"
                     ></component-spacer>
                     <component-spacer
                        cssStyle="width:50px; height: 50px; background-color:var(--app-color-primary)"
                     ></component-spacer>
                  </component-flex-container>
               </component-tab-content>

               <component-tab slot="tab" tabContentId="codeContent">Code</component-tab>
               <component-tab-content slot="tabContent" id="codeContent">
                  <component-code
                     code="<component-flex-container keylineAlignment=${'"'
            .concat(this.keylineAlignment)
            .concat('"')} keylineSize=${'"'.concat(this.keylineSize).concat('"')}></component-flex-container>"
                  ></component-code>
               </component-tab-content>
            </component-tabs>
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

    private changeFlexJustifyContent(event: CustomEvent) {
        this.justifyContent = (<any>FlexJustifyContent)[event.detail.value];
    }



}
