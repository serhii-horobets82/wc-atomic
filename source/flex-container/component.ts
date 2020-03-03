import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {guard} from 'lit-html/directives/guard';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {ComponentLoader} from '../abstract/component-loader';
import {BasicService} from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');


export class MobileResizeMode {
   static NONE = 'NONE';
   static CONTAINER_FULL_WIDTH = 'CONTAINER_FULL_WIDTH';
   static ITEM_FULL_WIDTH = 'ITEM_FULL_WIDTH';
   static CONTAINER_ITEM_FULL_WIDTH = 'CONTAINER_ITEM_FULL_WIDTH';
}

export class KeylineAlignment {
   static HORIZONTAL = 'KEYLINE_ALIGNMENT_HORIZONTAL';
   static VERTICAL = 'KEYLINE_ALIGNMENT_VERTICAL';
   static BOTH = 'KEYLINE_ALIGNMENT_BOTH';
}

export class KeylineSize {
   static ZERO = 'PADDING_ZERO';
   static LITTLE = 'PADDING_LITTLE';
   static SMALL = 'PADDING_SMALL';
   static MEDIUM = 'PADDING_MEDIUM';
   static BIG = 'PADDING_BIG';
   static MAX = 'PADDING_MAX';
}

export class FlexDirection {
   static ROW = 'row';
   static ROW_REVERSE = 'rowData-reverse';
   static COLUMN = 'column';
   static COLUMN_REVERSE = 'column-reverse';
}

export class FlexWrap {
   static WRAP = 'wrap';
   static NO_WRAP = 'nowrap';
   static WRAP_REVERSE = 'wrap-reverse';
}

export class FlexJustifyContent {
   static FLEX_START = 'flex-start';
   static FLEX_END = 'flex-end';
   static CENTER = 'center';
   static SPACE_BETWEEN = 'space-between';
   static SPACE_AROUND = 'space-around';
   static SPACE_EVENLY = 'space-evenly';
}

export class AlignItems {
   static FLEX_START = 'flex-start';
   static FLEX_END = 'flex-end';
   static CENTER = 'center';
   static STRETCH = 'stretch';
   static START = 'start';
   static END = 'end';
   static BASELINE = 'baseline';
   static FIRST_BASELINE = 'first baseline';
   static LAST_BASLINE = 'last baseline';
   static SAFE = 'safe';
   static UNSAFE = 'unsafe';
}

export class AlignContent {
   static FLEX_START = 'flex-start';
   static FLEX_END = 'flex-end';
   static CENTER = 'center';
   static STRETCH = 'stretch';
   static SPACE_AROUND = 'space-around';
   static SPACE_EVENLY = 'space-evenly';
   static SPACE_BETWEEN = 'space-between';
   static START = 'start';
   static END = 'end';
   static BASELINE = 'baseline';
   static FIRST_BASELINE = 'first baseline';
   static LAST_BASLINE = 'last baseline';
   static SAFE = 'safe';
   static UNSAFE = 'unsafe';
}

export class FlexContainerInputData extends AbstractInputData {
   containerClazz: string = 'container_100';
   itemFlexBasisValue: string = 'auto';
   itemFlexBasisValues: string[] = [];
   direction: string = FlexDirection.ROW;
   flexWrap: string = FlexWrap.WRAP;
   justifyContent: string = FlexJustifyContent.FLEX_START;
   alignItems: string = AlignItems.STRETCH;
   alignContent: string = AlignContent.STRETCH;
   keylineAlignment: string = KeylineAlignment.BOTH;
   keylineSize: string = KeylineSize.ZERO;
   inputDataItems: AbstractInputData[] = [];
}

@customElement('component-flex-container')
export class FlexComponent extends AbstractComponent<FlexContainerInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'FlexComponent';

   @property()
   resizeModeSmartphone: string = MobileResizeMode.NONE;

   @property()
   resizeModeTablet: string = MobileResizeMode.NONE;

   @property()
   flexDirection: string = FlexDirection.ROW;

   @property()
   flexWrap: string = FlexWrap.WRAP;

   @property()
   flexJustifyContent: string = FlexJustifyContent.FLEX_START;

   @property()
   alignItems: string = AlignItems.STRETCH;

   @property()
   alignContent: string = AlignContent.STRETCH;

   @property()
   keylineAlignment: string = KeylineAlignment.BOTH;

   @property()
   keylineSize: string = KeylineSize.ZERO;

   @property()
   containerClazz: string = new FlexContainerInputData().containerClazz;

   @property()
   itemFlexBasisValue: string = new FlexContainerInputData().itemFlexBasisValue;

   @property()
   itemFlexBasisValues: string[] = new FlexContainerInputData().itemFlexBasisValues;

   @property()
   inputDataItems: AbstractInputData[] = [];

   @query('#slotElement')
   slotElement: HTMLSlotElement | undefined;

   render() {
      return html`
         <div
            class="FLEX_CONTAINER ${this.containerClazz} ${this.resizeModeSmartphone}_SMARTPHONE ${this.resizeModeTablet}_TABLET"
            style="flex-direction: ${this.flexDirection}; flex-wrap: ${this.flexWrap}; justify-content: ${this
               .flexJustifyContent}; align-items: ${this.alignItems}; align-content: ${this.alignContent};"
         >
            ${guard(
               this.inputDataItems,
               () =>
                  html`
                     ${repeat(
                        this.inputDataItems,
                        (componentInputData, index) => html`
                           <div class="FLEX_ITEM ${this.resizeModeSmartphone}_SMARTPHONE ${this.resizeModeTablet}_TABLET" style="${this.getFlexItemStyle(index)};">
                              ${ComponentLoader.getUniqueInstance().createComponentFromInputData(componentInputData)}
                           </div>
                        `
                     )}
                  `
            )}
            <slot id="slotElement" @slotchange="${(event: Event) => this.slotChanged(event)}"></slot>
         </div>
      `;
   }

   protected update(changedProperties: Map<PropertyKey, unknown>): void {
      super.update(changedProperties);
      if (
         changedProperties.get('itemFlexBasisValue') != undefined ||
         changedProperties.get('itemFlexBasisValues') != undefined ||
         changedProperties.get('keylineAlignment') != undefined ||
         changedProperties.get('keylineSize') != undefined
      ) {
         this.changeSlotElementStyle();
      }
   }

   slotChanged(event: Event) {
      let slotElement: HTMLSlotElement = <HTMLSlotElement>event.target;
      this.changeElementStyle(slotElement);
   }

   private changeSlotElementStyle() {
      if (this.slotElement != undefined) {
         this.changeElementStyle(this.slotElement);
      }
   }

   private changeElementStyle(slotElement: HTMLSlotElement) {
      if (slotElement == null) {
         return;
      }

      let elements: Element[] = slotElement.assignedElements();

      for (let index = 0; index < elements.length; index++) {
         let element: Element = elements[index];

         let classList = element.classList;
         classList.add('FLEX_ITEM');
         classList.add(this.resizeModeSmartphone.concat('_SMARTPHONE'));
         classList.add(this.resizeModeTablet.concat('_TABLET'));

         classList.remove(KeylineAlignment.BOTH);
         classList.remove(KeylineAlignment.HORIZONTAL);
         classList.remove(KeylineAlignment.VERTICAL);
         classList.add(this.keylineAlignment);

         classList.remove(KeylineSize.ZERO);
         classList.remove(KeylineSize.LITTLE);
         classList.remove(KeylineSize.SMALL);
         classList.remove(KeylineSize.MEDIUM);
         classList.remove(KeylineSize.BIG);
         classList.remove(KeylineSize.MAX);
         classList.add(this.keylineSize);

         let currentStyle: string | null = element.getAttribute('style');
         if (currentStyle === null) {
            element.setAttribute('style', this.getFlexItemStyle(index) + ';');
         } else {
            let currentStyles = currentStyle.split(';');
            currentStyle = '';
            currentStyles.forEach((value) => {
               if (value.length > 0 && value.lastIndexOf('flex-basis') === -1 && value.lastIndexOf('max-width') === -1) {
                  currentStyle += value + ';';
               }
            });
            currentStyle += this.getFlexItemStyle(index) + ';';
            element.setAttribute('style', currentStyle);
         }
      }
   }

   private getFlexItemStyle(index: number): string {
      let flexBasisValue = BasicService.getUniqueInstance().getValue(this.itemFlexBasisValues[index], this.itemFlexBasisValue);
      return 'flex-basis: '
         .concat(flexBasisValue)
         .concat(';max-width: ')
         .concat(flexBasisValue);
   }

   inputDataChanged() {
      let defaultData: FlexContainerInputData = new FlexContainerInputData();
      this.containerClazz = BasicService.getUniqueInstance().getValue(this.inputData.containerClazz, defaultData.containerClazz);
      this.itemFlexBasisValue = BasicService.getUniqueInstance().getValue(this.inputData.itemFlexBasisValue, defaultData.itemFlexBasisValue);
      this.itemFlexBasisValues = BasicService.getUniqueInstance().getValue(this.inputData.itemFlexBasisValues, defaultData.itemFlexBasisValues);
      this.flexJustifyContent = BasicService.getUniqueInstance().getValue(this.inputData.justifyContent, defaultData.justifyContent);
      this.alignItems = BasicService.getUniqueInstance().getValue(this.inputData.alignItems, defaultData.alignItems);
      this.alignContent = BasicService.getUniqueInstance().getValue(this.inputData.alignContent, defaultData.alignContent);
      this.flexWrap = BasicService.getUniqueInstance().getValue(this.inputData.flexWrap, defaultData.flexWrap);
      this.flexDirection = BasicService.getUniqueInstance().getValue(this.inputData.direction, defaultData.direction);
      this.keylineAlignment = BasicService.getUniqueInstance().getValue(this.inputData.keylineAlignment, defaultData.keylineAlignment);
      this.keylineSize = BasicService.getUniqueInstance().getValue(this.inputData.keylineSize, defaultData.keylineSize);
      this.inputDataItems = BasicService.getUniqueInstance().getValue(this.inputData.inputDataItems, defaultData.inputDataItems);
   }

   getOutputData(): undefined {
      return undefined;
   }
}
