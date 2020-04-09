import { css, customElement, html, property, unsafeCSS, query } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../../abstract-component/component';
import { ListItemComponent } from '../item/component';
import { BasicService } from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');

export class ListInputData extends AbstractInputData {
   selectMode: boolean = false;
}

@customElement('component-list')
export class ListComponent extends AbstractComponent<ListInputData, number[]> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ListComponent';

   static EVENT_SELECTION_CHANGED: string = 'component-list-selection-changed';

   static EVENT_SELECTION_MODE_CHANGED: string = 'component-list-selection-mode-changed';

   @property()
   selectMode: boolean = false;

   @query('#slotElement')
   slotElement: HTMLSlotElement | undefined;

   render() {
      return html`
         <div class="list">
            <slot
               id="slotElement"
               @component-list-item-select="${(event: CustomEvent) => this.listItemSelected(event)}"
               @component-list-item-unselect="${(event: CustomEvent) => this.listItemUnSelected(event)}"
            ></slot>
         </div>
      `;
   }

   listItemSelected(event: CustomEvent) {
      let index: number = event.detail;
      console.log(index);
      BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, ListComponent.EVENT_SELECTION_CHANGED, index);
   }

   listItemUnSelected(event: CustomEvent) {
      let index: number = event.detail;
      console.log(index);
      if (this.getOutputData().length == 0) {
         this.resetSelectionMode();
      }
      BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, ListComponent.EVENT_SELECTION_CHANGED, index);
   }

   resetSelectionMode(): void {
      this.selectMode = false;
      BasicService.getUniqueInstance().dispatchSimpleCustomEvent(
          this,
          ListComponent.EVENT_SELECTION_MODE_CHANGED,
          this.selectMode
      );
   }

   getOutputData(): number[] {
      let selection: number[] = [];
      if (this.slotElement != null) {
         let slottedElements = this.slotElement.assignedElements();
         let indexListItemComponents = 0;
         for (let index = 0; index < slottedElements.length; index++) {
            let element = slottedElements[index];
            if (element instanceof ListItemComponent) {
               if (element.selected) {
                  selection.push(indexListItemComponents);
               }
               indexListItemComponents++;
            }
         }
      }
      return selection;
   }

   protected inputDataChanged() {
      let defaultData: ListInputData = new ListInputData();
      this.selectMode = BasicService.getUniqueInstance().getValue(this.inputData.selectMode, defaultData.selectMode);
   }

}
