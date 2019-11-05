import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { guard } from 'lit-html/directives/guard';
import { AbstractComponent, AbstractInputData } from '../../abstract-component/component';
import { TextComponent } from '../../text/component';
import { AccordionItemComponent, AccordionItemInputData } from '../item/component';

const componentCSS = require('./component.css');

export class AccordionInputData extends AbstractInputData {
   items?: AccordionItemInputData[];
}

@customElement('component-accordion')
export class AccordionComponent extends AbstractComponent<AccordionInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'AccordionComponent';

   @property()
   items: AccordionItemInputData[] = [];

   render() {
      return html`
         <div>
            ${guard(
               [this.items],
               () => html`
                  ${repeat(
                     this.items,
                     (item) => item.header,
                     (item) => html`
                        <component-accordion-item .inputData="${item}"></component-accordion-item>
                     `
                  )}
               `
            )}
            <slot></slot>
         </div>
      `;
   }

   getDefaultInputData(): AccordionInputData {
      return <AccordionInputData>{
         componentIdentifier: AccordionComponent.IDENTIFIER,
         items: [
            {
               componentIdentifier: AccordionItemComponent.IDENTIFIER,
               header: 'Mein Accordion',
               componentData: new TextComponent().getDefaultInputData(),
               stateClazz: 'closed'
            }
         ]
      };
   }

   getOutputData(): any {
      return {};
   }

   protected inputDataChanged() {
      this.items = this.basicService.getValue(this.inputData.items, []);
   }
}