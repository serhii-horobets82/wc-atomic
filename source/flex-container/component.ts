import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {guard} from 'lit-html/directives/guard';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {ComponentLoader} from '../abstract/component-loader';
import {BasicService} from '@domoskanonos/frontend-basis';
import {ColorClasses} from "../meta-data/color-classes";

const componentCSS = require('./component.css');

export class ContainerClazzValues {
   static CONTAINER_MIN_CONTENT = 'CONTAINER_MIN_CONTENT';
   static CONTAINER_100 = 'CONTAINER_100';
   static CONTAINER_75 = 'CONTAINER_75';
   static CONTAINER_50 = 'CONTAINER_50';
   static CONTAINER_25 = 'CONTAINER_25';
   static TABLET_MAX_WIDTH = 'TABLET_MAX_WIDTH';
   static SMARTPHONE_MAX_WIDTH = 'SMARTPHONE_MAX_WIDTH';
   static PRIMARY_COLOR = ColorClasses.PRIMARY_COLOR;
   static SECONDARY_COLOR = ColorClasses.SECONDARY_COLOR;
   static SURFACE_COLOR = ColorClasses.SURFACE_COLOR;
   static BACKGROUND_COLOR = ColorClasses.BACKGROUND_COLOR;
}

export class ItemClazzValues {
   static TABLET_MAX_WIDTH = 'TABLET_MAX_WIDTH';
   static SMARTPHONE_MAX_WIDTH = 'SMARTPHONE_MAX_WIDTH';
   static KEYLINE_ALIGNMENT_HORIZONTAL = 'KEYLINE_ALIGNMENT_HORIZONTAL';
   static KEYLINE_ALIGNMENT_VERTICAL = 'KEYLINE_ALIGNMENT_VERTICAL';
   static KEYLINE_ALIGNMENT_BOTH = 'KEYLINE_ALIGNMENT_BOTH';
   static KEYLINE_SIZE_ZERO = 'PADDING_ZERO';
   static KEYLINE_SIZE_LITTLE = 'PADDING_LITTLE';
   static KEYLINE_SIZE_SMALL = 'PADDING_SMALL';
   static KEYLINE_SIZE_MEDIUM = 'PADDING_MEDIUM';
   static KEYLINE_SIZE_BIG = 'PADDING_BIG';
   static KEYLINE_SIZE_MAX = 'PADDING_MAX';
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
   static WRAP_REVERSE = 'flexWrap-reverse';
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
   containerClazzes: string[] = [ContainerClazzValues.CONTAINER_100];
   cssStyle: string = '';
   flexDirection: string = FlexDirection.ROW;
   flexWrap: string = FlexWrap.WRAP;
   flexJustifyContent: string = FlexJustifyContent.FLEX_START;
   alignItems: string = AlignItems.STRETCH;
   alignContent: string = AlignContent.STRETCH;
   itemClazzes: string[] = [];
   itemFlexBasisValue: string = 'auto';
   itemFlexBasisValues: string[] = [];
   inputDataItems: AbstractInputData[] = [];
}

@customElement('component-flex-container')
export class FlexComponent extends AbstractComponent<FlexContainerInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'FlexComponent';

   @property()
   containerClazzes: string[] = new FlexContainerInputData().containerClazzes;

   @property()
   cssStyle: string = new FlexContainerInputData().cssStyle;

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
   itemClazzes: string[] = new FlexContainerInputData().itemClazzes;

   @property()
   itemFlexBasisValue: string = new FlexContainerInputData().itemFlexBasisValue;

   @property()
   itemFlexBasisValues: string[] = new FlexContainerInputData().itemFlexBasisValues;

   @property()
   inputDataItems: AbstractInputData[] = new FlexContainerInputData().inputDataItems;

   @query('#slotElement')
   slotElement: HTMLSlotElement | undefined;

   render() {
      return html`
         <div
            class="${this.toContainerClazzesString(this.containerClazzes)}"
            style="flex-direction: ${this.flexDirection}; flex-wrap: ${this.flexWrap}; justify-content: ${this
          .flexJustifyContent}; align-items: ${this.alignItems}; align-content: ${this.alignContent}; ${this.cssStyle}"
         >
            ${guard(
          this.inputDataItems,
          () =>
              html`
                     ${repeat(
                  this.inputDataItems,
                  (componentInputData, index) => html`
                           ${this.createItem(componentInputData, index)}
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
          changedProperties.get('itemClazzes') != undefined
      ) {
         this.changeSlotComponentsStyle(this.slotElement);
      }
   }

   slotChanged(event: Event) {
      let slotElement: HTMLSlotElement = <HTMLSlotElement>event.target;
      this.changeSlotComponentsStyle(slotElement);
   }

   private changeSlotComponentsStyle(slotElement: HTMLSlotElement | undefined) {
      if (slotElement == undefined) {
         return;
      }
      let elements: Element[] = slotElement.assignedElements();
      for (let index = 0; index < elements.length; index++) {
         let element: Element = elements[index];
         this.changeItemStyle(element, index);
      }
   }

   private changeItemStyle(element: Element, index: number) {
      let classList = element.classList;
      classList.remove(ItemClazzValues.SMARTPHONE_MAX_WIDTH);
      classList.remove(ItemClazzValues.TABLET_MAX_WIDTH);
      classList.remove(ItemClazzValues.KEYLINE_ALIGNMENT_BOTH);
      classList.remove(ItemClazzValues.KEYLINE_ALIGNMENT_HORIZONTAL);
      classList.remove(ItemClazzValues.KEYLINE_ALIGNMENT_VERTICAL);
      classList.remove(ItemClazzValues.KEYLINE_SIZE_BIG);
      classList.remove(ItemClazzValues.KEYLINE_SIZE_LITTLE);
      classList.remove(ItemClazzValues.KEYLINE_SIZE_MAX);
      classList.remove(ItemClazzValues.KEYLINE_SIZE_MEDIUM);
      classList.remove(ItemClazzValues.KEYLINE_SIZE_SMALL);
      classList.remove(ItemClazzValues.KEYLINE_SIZE_ZERO);
      classList.add('FLEX_ITEM');
      this.itemClazzes.forEach((clazz) => {
         classList.add(clazz);
      });

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

   private getFlexItemStyle(index: number): string {
      let flexBasisValue = BasicService.getUniqueInstance().getValue(this.itemFlexBasisValues[index], this.itemFlexBasisValue);
      return 'flex-basis: '
         .concat(flexBasisValue)
         .concat(';max-width: ')
         .concat(flexBasisValue);
   }

   inputDataChanged() {
      let defaultData: FlexContainerInputData = new FlexContainerInputData();
      this.containerClazzes = BasicService.getUniqueInstance().getValue(
          this.inputData.containerClazzes,
          defaultData.containerClazzes
      );
      this.cssStyle = BasicService.getUniqueInstance().getValue(this.inputData.cssStyle, defaultData.cssStyle);
      this.flexDirection = BasicService.getUniqueInstance().getValue(this.inputData.flexDirection, defaultData.flexDirection);
      this.flexWrap = BasicService.getUniqueInstance().getValue(this.inputData.flexWrap, defaultData.flexWrap);
      this.flexJustifyContent = BasicService.getUniqueInstance().getValue(
          this.inputData.flexJustifyContent,
          defaultData.flexJustifyContent
      );
      this.alignItems = BasicService.getUniqueInstance().getValue(this.inputData.alignItems, defaultData.alignItems);
      this.alignContent = BasicService.getUniqueInstance().getValue(this.inputData.alignContent, defaultData.alignContent);
      this.itemClazzes = BasicService.getUniqueInstance().getValue(this.inputData.itemClazzes, defaultData.itemClazzes);
      this.itemFlexBasisValue = BasicService.getUniqueInstance().getValue(
          this.inputData.itemFlexBasisValue,
          defaultData.itemFlexBasisValue
      );
      this.itemFlexBasisValues = BasicService.getUniqueInstance().getValue(
          this.inputData.itemFlexBasisValues,
          defaultData.itemFlexBasisValues
      );
      this.inputDataItems = BasicService.getUniqueInstance().getValue(this.inputData.inputDataItems, defaultData.inputDataItems);
   }

   getOutputData(): undefined {
      return undefined;
   }

   private createItem(componentInputData: AbstractInputData, index: number) {
      let abstractComponent = ComponentLoader.getUniqueInstance().createComponentFromInputData(componentInputData);
      this.changeItemStyle(abstractComponent, index);
      return abstractComponent;
   }

   toContainerClazzesString(containerClazzeses: string[]) {
      let containerClazzString: string = 'FLEX_CONTAINER';
      containerClazzeses.forEach((clazz) => {
         containerClazzString = containerClazzString.concat(' ').concat(clazz);
      });
      return containerClazzString;
   }
}
