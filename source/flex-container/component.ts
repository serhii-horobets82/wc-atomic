import { css, customElement, html, property, query, unsafeCSS } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { guard } from 'lit-html/directives/guard';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { ComponentLoader } from '../abstract/component-loader';

const componentCSS = require('./component.css');

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
   static ROW_REVERSE = 'row-reverse';
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
   containerClazz?: string;
   itemClazz?: string;
   itemFlexBasisValue?: string = 'auto';
   itemFlexBasisValues?: string[];
   direction: string = FlexDirection.ROW;
   flexWrap: string = FlexWrap.WRAP;
   justifyContent: string = FlexJustifyContent.FLEX_START;
   alignItems: string = AlignItems.STRETCH;
   alignContent: string = AlignContent.STRETCH;
   keylineAlignment: string = KeylineAlignment.BOTH;
   keylineSize: string = KeylineSize.ZERO;
   componentsInputData?: AbstractInputData[];
}

@customElement('component-flex-container')
export class FlexComponent extends AbstractComponent<FlexContainerInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'FlexComponent';

   @property()
   private _componentsInputData: AbstractInputData[] = [];

   constructor() {
      super();
   }

   get componentsInputData(): AbstractInputData[] {
      return this._componentsInputData !== undefined ? this._componentsInputData : [];
   }

   set componentsInputData(value: AbstractInputData[]) {
      this._componentsInputData = value;
   }

   @property()
   private _componentsMap = new Map<AbstractInputData, AbstractComponent<any, any>>();

   get componentsMap(): Map<AbstractInputData, AbstractComponent<any, any>> {
      return this._componentsMap;
   }

   set componentsMap(value: Map<AbstractInputData, AbstractComponent<any, any>>) {
      this._componentsMap = value;
   }

   protected createComponentFromData(componentInputData: AbstractInputData): AbstractComponent<any, any> {
      console.log('create component from inputData= ' + componentInputData.componentIdentifier);
      let component = this._componentsMap.get(componentInputData);
      if (component == null) {
         component = ComponentLoader.INSTANCE.createComponentFromInputData(componentInputData);
         this._componentsMap.set(componentInputData, component);
      }
      console.log('component created: ' + componentInputData.componentIdentifier);
      return component;
   }

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
   keylineSize: string = KeylineSize.ZERO;

   @property()
   containerClazz: string = 'container_100';

   @property()
   itemClazz: string = '';

   @property()
   itemFlexBasisValues: string[] = [];

   @property()
   itemFlexBasisValue: string = 'auto';

   @query('#slotElement')
   slotElement: HTMLSlotElement | undefined;

   render() {
      return html`
         <div
            class="flex_container ${this.containerClazz}"
            style="flex-direction: ${this.direction}; flex-wrap: ${this.wrap}; justify-content: ${this
               .justifyContent}; align-items: ${this.alignItems}; align-content: ${this.alignContent};"
         >
            ${guard(
               this.componentsInputData,
               () =>
                  html`
                     ${repeat(
                        this.componentsInputData,
                        (componentInputData, index) => html`
                           <div class="flex_item ${this.itemClazz}" style="${this.getFlexItemStyle(index)};">
                              ${this.createComponentFromData(componentInputData)}
                           </div>
                        `
                     )}
                  `
            )}
            <slot id="slotElement"></slot>
         </div>
      `;
   }

   getFlexItemStyle(index: number): string {
      let flexBasisValue =
         this.itemFlexBasisValues !== undefined
            ? this.itemFlexBasisValues[index] !== undefined
               ? this.itemFlexBasisValues[index]
               : this.itemFlexBasisValue
            : undefined;
      return 'flex-basis: '
         .concat(this.basicService.getValue(flexBasisValue, ''))
         .concat(';max-width: ')
         .concat(this.basicService.getValue(flexBasisValue, ''));
   }

   updated(_changedProperties: Map<PropertyKey, unknown>): void {
      if (this.shadowRoot === null) {
         console.debug('shadow root not active');
         return;
      }

      if (this.slotElement == null) {
         return;
      }

      let elements: Element[] = this.slotElement.assignedElements();

      for (let index = 0; index < elements.length; index++) {
         let element: Element = elements[index];

         let classList = element.classList;
         classList.add('flex_item');

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


         if (this.itemClazz.length > 0 && !classList.contains(this.itemClazz)) {
            let itemClazzesSplitted: string[] = this.itemClazz.split(' ');
            itemClazzesSplitted.forEach((itemClazz) => {
               classList.add(itemClazz);
            });
         }

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

   inputDataChanged() {
      this.containerClazz = this.basicService.getValue(this.inputData.containerClazz, 'container_100');
      this.itemClazz = this.basicService.getValue(this.inputData.itemClazz, '');
      this.itemFlexBasisValue = this.basicService.getValue(this.inputData.itemFlexBasisValue, 'auto');
      this.itemFlexBasisValues = this.basicService.getValue(this.inputData.itemFlexBasisValues, []);
      this.direction = this.basicService.getValue(this.inputData.direction, this.direction);
      this.wrap = this.basicService.getValue(this.inputData.flexWrap, this.wrap);
      this.justifyContent = this.basicService.getValue(this.inputData.justifyContent, this.justifyContent);
      this.alignItems = this.basicService.getValue(this.inputData.alignItems, this.alignItems);
      this.alignContent = this.basicService.getValue(this.inputData.alignContent, this.alignContent);
      this.keylineAlignment = this.basicService.getValue(this.inputData.keylineAlignment, this.keylineAlignment);
      this.keylineSize = this.basicService.getValue(this.inputData.keylineSize, this.keylineSize);
      this.componentsInputData = this.basicService.getValue(this.inputData.componentsInputData, []);
   }

   getOutputData(): undefined {
      return undefined;
   }

   getDefaultInputData(): FlexContainerInputData {
      return <FlexContainerInputData>{
         componentIdentifier: FlexComponent.IDENTIFIER
      };
   }
}
