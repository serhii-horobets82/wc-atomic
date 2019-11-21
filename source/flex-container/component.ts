import { css, customElement, html, property, query, unsafeCSS } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { guard } from 'lit-html/directives/guard';
import { ImgComponent } from '../img/component';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { ComponentLoader } from '../abstract/component-loader';

const componentCSS = require('./component.css');

export enum FlexPaddingAlignment {
   HORIZONTAL = 'PADDING_ALIGNMENT_HORIZONTAL',
   VERTICAL = 'PADDING_ALIGNMENT_VERTICAL',
   BOTH = 'PADDING_ALIGNMENT_BOTH',
}

export enum FlexPadding {
   ZERO = 'PADDING_ZERO',
   LITTLE = 'PADDING_LITTLE',
   SMALL = 'PADDING_SMALL',
   MEDIUM = 'PADDING_MEDIUM',
   BIG = 'PADDING_BIG',
   MAX = 'PADDING_MAX',
}

export class FlexContainerInputData extends AbstractInputData {
   containerClazz?: string;
   itemClazz?: string;
   itemFlexBasisValue?: string = 'auto';
   itemFlexBasisValues?: string[];
   paddingAlignment: FlexPaddingAlignment = FlexPaddingAlignment.BOTH;
   padding: FlexPadding = FlexPadding.ZERO;
   headlessPadding: boolean = false;
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
   paddingAlignment: FlexPaddingAlignment = FlexPaddingAlignment.BOTH;

   @property()
   padding: FlexPadding = FlexPadding.ZERO;

   @property()
   headlessPadding: boolean = false;

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
         <div class="flex_container ${this.padding} ${this.paddingAlignment} ${this.containerClazz} ${this.headlessPadding ? 'HEADLESS_PADDING' : ''}">
            ${guard(
               this.componentsInputData,
               () =>
                  html`
                     ${repeat(
                        this.componentsInputData,
                        (componentInputData, index) => html`
                           <div class="flex_item ${this.padding} ${this.paddingAlignment} ${this.itemClazz}" style="${this.getFlexItemStyle(index)};">
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
      return 'flex-basis: '.concat(this.basicService.getValue(flexBasisValue, '')).concat(';max-width: ').concat(this.basicService.getValue(flexBasisValue, ''));
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
         //if (!classList.contains('flex_item')) {
         classList.add('flex_item');
         //}

         classList.add(this.paddingAlignment);
         classList.add(this.padding);


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
      this.componentsInputData = this.inputData.componentsInputData !== undefined ? this.inputData.componentsInputData : [];

      this.containerClazz = this.inputData.containerClazz !== undefined ? this.inputData.containerClazz : 'container_100';

      this.itemClazz = this.inputData.itemClazz !== undefined ? this.inputData.itemClazz : '';

      this.itemFlexBasisValue =
          this.inputData.itemFlexBasisValue !== undefined ? this.inputData.itemFlexBasisValue : 'auto';

      this.itemFlexBasisValues = this.inputData.itemFlexBasisValues !== undefined ? this.inputData.itemFlexBasisValues : [];

      this.headlessPadding = this.basicService.getValue(this.inputData.headlessPadding, false);

   }

   getOutputData(): undefined {
      return undefined;
   }

   getDefaultInputData(): FlexContainerInputData {
      return <FlexContainerInputData>{
         componentIdentifier: FlexComponent.IDENTIFIER,
      };
   }
}
