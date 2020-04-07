import { customElement, html, property, query, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import {
   AlignContent,
   AlignItems,
   ContainerClazzValues,
   FlexComponent,
   FlexDirection,
   FlexJustifyContent,
   FlexWrap,
   ItemClazzValues
} from '../flex-container/component';
import { ColorType, InputfieldComponent, InputfieldType, SpacerSize, TypographyType } from '..';
import { BasicService } from '@domoskanonos/frontend-basis';

@customElement('page-layout')
export class PageLayoutComponent extends PageAbstract {
   @property()
   containerClazzes: string[] = [ContainerClazzValues.CONTAINER_100];

   @property()
   colorType: string = ColorType.SECONDARY_COLOR;

   @property()
   itemClazzes: string[] = [ItemClazzValues.TABLET_MAX_WIDTH, ItemClazzValues.SMARTPHONE_MAX_WIDTH];

   @property()
   itemFlexBasisValue: string = 'auto';

   @property()
   direction: string = FlexDirection.ROW;

   @property()
   flexWrap: string = FlexWrap.WRAP;

   @property()
   flexJustifyContent: string = FlexJustifyContent.FLEX_START;

   @property()
   alignItems: string = AlignItems.STRETCH;

   @property()
   alignContent: string = AlignContent.STRETCH;

   @query('#sample-flex-container')
   flexContainer: FlexComponent | undefined;

   getMainComponent(): TemplateResult {
      return html`
         <component-flex-container
            .containerClazzes="${[ContainerClazzValues.CONTAINER_75]}"
            .itemClazzes="${[ItemClazzValues.KEYLINE_SIZE_MEDIUM]}"
            .itemFlexBasisValues="${['100%', '50%', '50%']}"
         >
            <component-flex-container
               .containerClazzes="${[ContainerClazzValues.CONTAINER_100]}"
               .flexJustifyContent="${FlexJustifyContent.FLEX_START}"
               .alignItems="${AlignItems.CENTER}"
               itemFlexBasisValue="100%"
            >
               <component-typography .typographyType="${TypographyType.H2}">Layout System</component-typography>
               <component-typography .typographyType="${TypographyType.H4}"
                  >Positionieren und Ausrichten von Elementen</component-typography
               >

               <component-typography type="${TypographyType.BODY1}"
                  >Die Komponente <i>component-flex-container</i> basiert auf dem CSS Flexbox Layout Modell (display: flex). Auf
                  dieser Seite können Sie diese Komponente und deren Eigenschaften ausführlich testen.</component-typography
               >
            </component-flex-container>

            <component-container>
               <component-color colorType="${this.colorType}">
                  <component-flex-container
                     id="sample-flex-container"
                     .containerClazzes="${this.containerClazzes}"
                     colorType="${this.colorType}"
                     .itemClazzes="${this.itemClazzes}"
                     cssStyle="height:500px;"
                     itemFlexBasisValue="${this.itemFlexBasisValue}"
                     .flexDirection="${this.direction}"
                     .flexWrap="${this.flexWrap}"
                     .flexJustifyContent="${this.flexJustifyContent}"
                     .alignItems="${this.alignItems}"
                     .alignContent="${this.alignContent}"
                  >
                     <component-spacer
                        cssStyle="width:200px; height: 200px; background-color:var(--app-color-surface)"
                     ></component-spacer>
                     <component-spacer
                        cssStyle="width:200px; height: 100px; background-color:var(--app-color-primary)"
                     ></component-spacer>
                     <component-spacer
                        cssStyle="width:100px; height: 200px; background-color:var(--app-color-surface)"
                     ></component-spacer>
                     <component-spacer
                        cssStyle="width:200px; height: 200px; background-color:var(--app-color-surface)"
                     ></component-spacer>
                     <component-spacer
                        cssStyle="width:100px; height: 100px; background-color:var(--app-color-surface)"
                     ></component-spacer>
                     <component-spacer
                        cssStyle="width:50px; height: 50px; background-color:var(--app-color-surface)"
                     ></component-spacer>

                     <component-spacer
                        .size="${SpacerSize.BIG}"
                        cssStyle="background-color:var(--app-color-surface)"
                     ></component-spacer>

                     <component-spacer
                        .size="${SpacerSize.BIG}"
                        cssStyle="background-color:var(--app-color-surface)"
                     ></component-spacer>

                     <component-spacer
                        .size="${SpacerSize.BIG}"
                        cssStyle="background-color:var(--app-color-surface)"
                     ></component-spacer>
                  </component-flex-container>
               </component-color>
               <component-code
                  >&lt;component-flex-container .containerClazzes="${['CONTAINER_100']}"
                  .flexDirection="$&#123;FlexDirection.${BasicService.getUniqueInstance().getEnumKey(
                     this.direction,
                     FlexDirection
                  )}&#125;"
                  .flexWrap="$&#123;FlexWrap.${BasicService.getUniqueInstance().getEnumKey(this.flexWrap, FlexWrap)}&#125;"
                  .flexJustifyContent="$&#123;FlexJustifyContent.${BasicService.getUniqueInstance().getEnumKey(
                     this.flexJustifyContent,
                     FlexJustifyContent
                  )}&#125;"
                  .alignItems="$&#123;AlignItems.${BasicService.getUniqueInstance().getEnumKey(
                     this.alignItems,
                     AlignItems
                  )}&#125;"
                  .alignContent="$&#123;AlignContent.${BasicService.getUniqueInstance().getEnumKey(
                     this.alignContent,
                     AlignContent
                  )}&#125;"
                  itemFlexBasisValue="${this.itemFlexBasisValue}" &gt; &lt;/component-flex-container&gt;
               </component-code>
            </component-container>

            <component-form>
               <component-inputfield
                  .inputfieldType="${InputfieldType.COMBOBOX}"
                  .options="${InputfieldComponent.enumToComboboxItems(FlexDirection)}"
                  label="FlexDirection"
                  value="${this.direction}"
                  @component-inputfield-change="${(event: CustomEvent) => this.changeFlexDirection(event)}"
               ></component-inputfield>

               <component-inputfield
                  .inputfieldType="${InputfieldType.COMBOBOX}"
                  .options="${InputfieldComponent.enumToComboboxItems(ContainerClazzValues)}"
                  label="ContainerClazzValues"
                  value="${this.containerClazzes}"
                  size="10"
                  multiple="true"
                  @component-inputfield-change="${(event: CustomEvent) => this.changeContainerClazzes(event)}"
               ></component-inputfield>

               <component-inputfield
                  .inputfieldType="${InputfieldType.COMBOBOX}"
                  .options="${InputfieldComponent.enumToComboboxItems(FlexWrap)}"
                  label="FlexWrap"
                  value="${this.flexWrap}"
                  @component-inputfield-change="${(event: CustomEvent) => this.changeFlexWrap(event)}"
               ></component-inputfield>

               <component-inputfield
                  .inputfieldType="${InputfieldType.COMBOBOX}"
                  .options="${InputfieldComponent.enumToComboboxItems(FlexJustifyContent)}"
                  label="FlexJustifyContent"
                  value="${this.flexJustifyContent}"
                  @component-inputfield-change="${(event: CustomEvent) => this.changeFlexJustify(event)}"
               ></component-inputfield>

               <component-inputfield
                  .inputfieldType="${InputfieldType.COMBOBOX}"
                  .options="${InputfieldComponent.enumToComboboxItems(AlignItems)}"
                  label="AlignItems"
                  value="${this.alignItems}"
                  @component-inputfield-change="${(event: CustomEvent) => this.changeAlignItems(event)}"
               ></component-inputfield>

               <component-inputfield
                  .inputfieldType="${InputfieldType.COMBOBOX}"
                  .options="${InputfieldComponent.enumToComboboxItems(AlignContent)}"
                  label="AlignContent"
                  value="${this.alignContent}"
                  @component-inputfield-change="${(event: CustomEvent) => this.changeAlignContent(event)}"
               ></component-inputfield>

               <component-inputfield
                  label="itemFlexBasisValue"
                  value="${this.itemFlexBasisValue}"
                  @component-inputfield-change="${(event: CustomEvent) => this.changeItemFlexBasis(event)}"
               ></component-inputfield>
            </component-form>
         </component-flex-container>
      `;
   }

   private changeFlexDirection(event: CustomEvent) {
      this.direction = (<any>FlexDirection)[event.detail.outputData.value];
   }

   private changeFlexWrap(event: CustomEvent) {
      this.flexWrap = (<any>FlexWrap)[event.detail.outputData.value];
   }

   private changeFlexJustify(event: CustomEvent) {
      this.flexJustifyContent = (<any>FlexJustifyContent)[event.detail.outputData.value];
   }

   private changeAlignItems(event: CustomEvent) {
      this.alignItems = (<any>AlignItems)[event.detail.outputData.value];
   }

   private changeAlignContent(event: CustomEvent) {
      this.alignContent = (<any>AlignContent)[event.detail.outputData.value];
   }

   private changeItemFlexBasis(event: CustomEvent) {
      this.itemFlexBasisValue = event.detail.outputData.value;
   }

   private changeContainerClazzes(event: CustomEvent) {
      this.containerClazzes = event.detail.outputData.value;
   }
}
