import { css, customElement, html, property, query, unsafeCSS } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { guard } from 'lit-html/directives/guard';
import { AbstractComponent, AbstractInputData } from '../../abstract-component/component';
import {ListItemComponent, ListItemInputData} from '../item/component';
import { BasicService } from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');

export class ListInputData extends AbstractInputData {
   selectMode: boolean = false;
}

@customElement('component-list')
export class ListComponent extends AbstractComponent<ListInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ListComponent';

   static EVENT_SELECTION_CHANGED: string = 'component-list-selection-changed';

   @property()
   selection: number[] = [];

   @property()
   selectMode: boolean = false;

   @query('#slotElement')
   slotElement: HTMLSlotElement | undefined;

   protected update(changedProperties: keyof any extends PropertyKey ? Map<keyof any, unknown> : never): void {
      super.update(changedProperties);
      changedProperties.forEach((oldValue, propName: any) => {
         console.log(`${propName} changed. oldValue: ${oldValue}`);
         if (propName == 'selection' && this.slotElement != null) {
            let slottedElements = this.slotElement.assignedElements();
            let indexListItemComponents = 0;
            for (let index = 0; index < slottedElements.length; index++) {
               let element = slottedElements[index];
               if (element instanceof ListItemComponent) {
                  console.log('update selected property of list item component.');
                  element.selected = this.selection[indexListItemComponents] != null;
                  indexListItemComponents++;
               }
            }
         }
      });
   }

   render() {
      return html`
         <div class="list">
            <slot
               @component-list-item-select="${(event: CustomEvent) => this.listItemSelected(event)}"
               @component-list-item-unselect="${(event: CustomEvent) => this.listItemUnSelected(event)}"
            ></slot>
         </div>
      `;
   }

   listItemSelected(event: CustomEvent) {
      let index: number = event.detail;
      console.log(index);
      this.selection.push(Number(index));
      BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, ListComponent.EVENT_SELECTION_CHANGED, this.selection);
   }

   listItemUnSelected(event: CustomEvent) {
      let index: number = event.detail;
      console.log(index);
      this.selection = this.selection.filter((obj) => obj !== Number(index));
      BasicService.getUniqueInstance().dispatchSimpleCustomEvent(this, ListComponent.EVENT_SELECTION_CHANGED, this.selection);
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
      let defaultData: ListInputData = new ListInputData();
      this.selectMode = BasicService.getUniqueInstance().getValue(this.inputData.selectMode, defaultData.selectMode);
   }

   itemsSelected(): boolean {
      return this.selection.length > 0;
   }
}
