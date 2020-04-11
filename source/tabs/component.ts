import { css, customElement, html, query, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { TabContentComponent } from './tab-content/component';
import { TabComponent } from './tab/component';

const componentCSS = require('./component.css');

export class TabsInputData extends AbstractInputData {
}

@customElement('component-tabs')
export class TabsComponent extends AbstractComponent<TabsInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'TabsComponent';

   @query('#tabSlot')
   tabSlot: HTMLSlotElement | undefined;

   @query('#tabContentSlot')
   tabContentSlot: HTMLSlotElement | undefined;

   render() {
      return html`
         <component-grid-container
            @component-tab-click="${(event: CustomEvent) => this.tabClicked(event)}"
            .gridTemplateRows="${['auto', 'auto']}"
            .gridTemplateColumns="${['auto']}"
         >
            <slot id="tabSlot" name="tab"></slot>
            <slot id="tabContentSlot" name="tabContent"></slot>
         </component-grid-container>
      `;
   }

   getDefaultInputData(): any {
      return <TabsInputData>{};
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {}

   private tabClicked(event: CustomEvent): void {
      let clickedTab: TabComponent = event.detail;
      let tabIndex: number = 0;
      if (this.tabSlot != null) {
         let assignedElements: Element[] = this.tabSlot.assignedElements();
         for (let index = 0; index < assignedElements.length; index++) {
            let element: Element = assignedElements[index];
            if (element instanceof TabComponent) {
               if (element == clickedTab) {
                  tabIndex = index;
                  element.selected = true;
               } else {
                  element.selected = false;
               }
            }
         }
      }

      console.log('tab selected, index = %s', tabIndex);

      let tabContentIndex: number = 0;
      if (this.tabContentSlot != null) {
         let assignedElements: Element[] = this.tabContentSlot.assignedElements();
         for (let index = 0; index < assignedElements.length; index++) {
            let tabContentElement: Element = assignedElements[index];
            if (tabContentElement instanceof TabContentComponent) {
               if (tabIndex == tabContentIndex) {
                  tabContentElement.selected = true;
               } else {
                  tabContentElement.selected = false;
               }
               tabContentIndex++;
            }
         }
      }
   }
}
