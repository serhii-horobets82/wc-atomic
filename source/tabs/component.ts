import { css, customElement, html, query, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { TabContentComponent } from './tab-content/component';
import { TabComponent } from './tab/component';

const componentCSS = require('./component.css');

export class TabsInputData extends AbstractInputData {
   clazz?: string;
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
         <component-flex-container containerClazz="container_100" itemFlexBasisValue="100%">
            <div class="tabHeader" @component-tab-click="${(event: CustomEvent) => this.tabClicked(event)}">
               <slot id="tabSlot" name="tab"></slot>
            </div>
            <div class="tabContent">
               <slot id="tabContentSlot" name="tabContent"></slot>
            </div>
         </component-flex-container>
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
      let elementId: string = event.detail;
      if (BasicService.getInstance().isBlank(elementId)) {
         return;
      }
      [this.tabSlot, this.tabContentSlot].forEach((slot) => {
         if (slot != null) {
            let assignedElements: Element[] = slot.assignedElements();
            for (let index = 0; index < assignedElements.length; index++) {
               let element: Element = assignedElements[index];
               if (element instanceof TabContentComponent || element instanceof TabComponent) {
                  if (element.id == elementId) {
                     element.selected = true;
                  } else {
                     element.selected = false;
                  }
               }
            }
         }
      });
      (<TabComponent>event.target).selected = true;
   }
}
