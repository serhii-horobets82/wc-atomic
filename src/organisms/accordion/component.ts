import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {guard} from 'lit-html/directives/guard';
import {AbstractComponent} from '../../abstract/abstract-component';
import {TextComponent} from '../../component/text/text';
import {ComponentLoader} from '../../abstract/component-loader';
import {AccordionInputData, AccordionItemInputData} from "./model";

const componentCSS = require('./component.css');


@customElement('component-accordion-item')
export class AccordionItemComponent extends AbstractComponent<AccordionItemInputData, any> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'AccordionItemComponent';

    @property()
    item: AccordionItemInputData;

    getDefaultInputData(): AccordionItemInputData {
        return <AccordionItemInputData>
            {
                componentIdentifier: AccordionItemComponent.IDENTIFIER,
                header: 'Mein Accordion',
                componentData: new TextComponent().getDefaultInputData(),
                stateClazz: 'closed'
            };
    }

    getOutputData(): any {
        return {};
    }

    protected inputDataChanged() {
        this.item = this.inputData;
    }

}


@customElement('component-accordion')
export class AccordionComponent extends AbstractComponent<AccordionInputData, any> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'AccordionComponent';

    @property()
    items: AccordionItemInputData[];

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
                        <div class="accordion">
                           <div
                              for="${index}"
                              class="accordionHeader"
                              @click="${() => this.toogle(item)}"
                           >
                              <component-text text="${item.header}"></component-text>
                              <component-icon style="float:right;"
                                 iconClazz="${item.stateClazz == 'closed'
                    ? 'fas fa-angle-right'
                    : 'fas fa-angle-up'}"
                              ></component-icon>
                           </div>
                           <div class="accordionContent ${item.stateClazz}">
                              ${ComponentLoader.INSTANCE.createComponentFromInputData(
                    item.componentData
                )}
                           </div>
                        </div>
                     `
            )}
               `
        )}
            <slot></slot>
         </div>
      `;
    }

    async toogle(item: AccordionItemInputData) {
        console.log('accordion clicked, state=' + item.stateClazz);
        if ('open' == item.stateClazz) {
            item.stateClazz = 'closed';
        } else {
            item.stateClazz = 'open';
        }
        this.items = this.items.map((item) => item);
        console.log('accordion clicked, after state=' + item.stateClazz);
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
