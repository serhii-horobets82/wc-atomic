import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {guard} from 'lit-html/directives/guard';
import {AbstractComponent} from '../../../abstract-component/component';
import {TextComponent} from '../../../text/component';
import {ComponentLoader} from '../../../abstract/component-loader';
import {AccordionInputData} from "./model";
import {AccordionItemInputData} from "../item/model";
import {AccordionItemComponent} from "../item/component";

const componentCSS = require('./component.css');

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
                (item, index) => html`
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
                   componentIdentifier : AccordionItemComponent.IDENTIFIER,
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
        this.items = this.inputData.items;
    }

}
