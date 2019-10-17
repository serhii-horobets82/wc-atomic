import {baseHelper} from '../../util/base';
import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {AbstractComponent} from '../../abstract/component/component';
import {TeaserContainerInputData} from './model';
import {TeaserElementInputData} from './teaser-element/model';
import {TeaserElementComponent} from './teaser-element/component';
import {SHADOW_DOM_HELPER} from "../../util/helper";
import {TeaserElementMenuComponent} from "./teaser-menu-element/component";

const componentCSS = require('./component.css');

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
      addEventListener('component-teaser-menu-element-click', (event) => this.selectItemElement(event), false);
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
                                 @click="${() => this.selectItem(item)}"
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

   selectItemElement(customEvent: Event) {
      let teaserElementMenuComponent: TeaserElementMenuComponent = (<CustomEvent>customEvent).detail;
      console.log('teaserElementMenuComponent clicked');
      SHADOW_DOM_HELPER.setProperty(this.menuSlotElement, 'selected', false, TeaserElementMenuComponent, null);
      teaserElementMenuComponent.selected = true;
      let indexOf: number = SHADOW_DOM_HELPER.indexOf(this.menuSlotElement, teaserElementMenuComponent);

      SHADOW_DOM_HELPER.setProperty(this.contentSlotElement, 'selected', false, TeaserElementComponent, null);

      let teaserElementComponent: TeaserElementComponent | null = SHADOW_DOM_HELPER.getElement(this.contentSlotElement, TeaserElementComponent, indexOf);
      if (teaserElementComponent != null) {
         teaserElementComponent.inputData.selected = true;
         teaserElementComponent.selected=true;
      }

   }

   selectItem(item: TeaserElementInputData) {
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
      this.items = baseHelper.getValue(this.inputData.items, []);
      if (this.items.length > 0) {
         this.selectItem(this.items[0]);
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
