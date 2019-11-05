import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { guard } from 'lit-html/directives/guard';
import { AbstractComponent, AbstractInputData } from '../../abstract-component/component';
import { ListItemInputData } from '../item/component';

const componentCSS = require('./component.css');

export class ListInputData extends AbstractInputData {
   items?: ListItemInputData[];
}

@customElement('component-list')
export class ListComponent extends AbstractComponent<ListInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ListComponent';

   @property()
   items: ListItemInputData[] = [];

   render() {
      return html`
         <div class="list">
            ${guard(
               [this.items],
               () => html`
                  ${repeat(
                     this.items,
                     (item) => html`
                        <component-list-item .inputData="${item}"></component-list-item>
                     `
                  )}
               `
            )}
            <slot></slot>
         </div>
      `;
   }

   getDefaultInputData(): ListInputData {
      return <ListInputData>{
         componentIdentifier: ListComponent.IDENTIFIER,
         items: []
      };
   }

   getOutputData(): any {
      return {};
   }

   protected inputDataChanged() {
      this.items = this.basicService.getValue(this.inputData.items, []);
   }
}
