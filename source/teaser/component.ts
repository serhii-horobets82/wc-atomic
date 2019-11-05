import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {TeaserElementComponent, TeaserElementInputData} from './teaser-element/component';
import {TeaserElementMenuComponent} from "./teaser-menu-element/component";

const componentCSS = require('./component.css');

export class TeaserContainerInputData extends AbstractInputData {
   items?: TeaserElementInputData[];
}

@customElement('component-teaser')
export class TeaserComponent extends AbstractComponent<TeaserContainerInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'TeaserComponent';

   @property()
   items: TeaserElementInputData[] = [];

   @query('#contentSlotElement')
   contentSlotElement: HTMLSlotElement | undefined;

   @query('#menuSlotElement')
   menuSlotElement: HTMLSlotElement | undefined;

   constructor() {
      super();
      addEventListener('component-teaser-menu-element-click', (event) => this.selectSlotItemEvent(event), false);
      setInterval(() => {
         this.nextItem()
      }, 10000);
   }

   render() {
      return html`
         <div class="viewport">
            ${guard(
          [this.items],
          () =>
              html`
                     ${repeat(
                  this.items,
                  (item) => html`
                           <component-teaser-element .inputData="${item}"></component-teaser-element>
                        `
              )}
                  `
      )}
            <slot id="contentSlotElement" name="content"></slot>
            <div class="menu">
               ${guard(
          [this.items],
          () =>
              html`
                        ${repeat(
                  this.items,
                  (item) => html`
                              <component-teaser-menu-element
                                 @click="${() => this.selectShadowDomItem(item)}"
                                 .inputData=${item}
                              ></component-teaser-menu-element>
                           `
              )}
                     `
      )}
               <slot id="menuSlotElement" name="menu"></slot>
            </div>
         </div>
      `;
   }


   selectSlotItemEvent(customEvent: Event) {
      let teaserElementMenuComponent: TeaserElementMenuComponent = (<CustomEvent>customEvent).detail;
      this.selectSlotItem(teaserElementMenuComponent);
   }

   selectSlotItem(teaserElementMenuComponent: TeaserElementMenuComponent) {
      console.log('teaserElementMenuComponent clicked');
      this.slotService.setProperty(this.menuSlotElement, 'selected', false, TeaserElementMenuComponent, null);
      teaserElementMenuComponent.inputData.selected = true;
      teaserElementMenuComponent.selected = true;

      let indexOf: number = this.slotService.indexOf(this.menuSlotElement, teaserElementMenuComponent);
      console.log(indexOf);

      this.slotService.setProperty(this.contentSlotElement, 'selected', false, TeaserElementComponent, null);
      let teaserElementComponent: TeaserElementComponent | null = this.slotService.getElement(this.contentSlotElement, TeaserElementComponent, indexOf);
      if (teaserElementComponent != null) {
         teaserElementComponent.inputData.selected = true;
         teaserElementComponent.selected=true;
      }

   }

   nextItem() {
      console.log("select next slot element");
      let teaserElementMenuComponent: TeaserElementMenuComponent | null = this.slotService.getElementByProperty(this.menuSlotElement, TeaserElementMenuComponent, 'selected');
      console.info(JSON.stringify(teaserElementMenuComponent));
      if (teaserElementMenuComponent != null) {
         let teaserElementMenuComponentNext: TeaserElementMenuComponent | null = this.slotService.nextElement(this.menuSlotElement, TeaserElementMenuComponent, teaserElementMenuComponent);
         if (teaserElementMenuComponentNext != null) {
            this.selectSlotItem(teaserElementMenuComponentNext);
         }
      }
   }

   selectShadowDomItem(item: TeaserElementInputData) {
      console.log('item clicked, state=' + item.selected + JSON.stringify(item));

      this.items.forEach((value) => {
         value.selected = false;
      });

      item.selected = true;
      this.items = this.items.map((item) => item);

      console.log('item clicked, after state=' + item.selected);
   }

   getDefaultInputData(): TeaserContainerInputData {
      return <TeaserContainerInputData>{
         componentIdentifier: TeaserComponent.IDENTIFIER,
         items: [
            new TeaserElementComponent().getDefaultInputData(),
            new TeaserElementComponent().getDefaultInputData(),
            new TeaserElementComponent().getDefaultInputData(),
            new TeaserElementComponent().getDefaultInputData()
         ]
      };
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
      this.items = this.basicService.getValue(this.inputData.items, []);
      if (this.items.length > 0) {
         this.selectShadowDomItem(this.items[0]);
      }

      if (this.contentSlotElement != null) {

         console.log('BBBBBBBB');

         let contentSlotelements: Element[] = this.contentSlotElement.assignedElements();
         for (let index = 0; index < contentSlotelements.length; index++) {
            let element: Element = contentSlotelements[index];

            console.log('cccccccccccccccccccccc' + element);

            if (element instanceof TeaserElementComponent) {
               console.log('slotted teaserElementComponent found.');
               element.selected = false;
            }

         }
      }
   }

}
