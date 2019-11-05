import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../../abstract-component/component';
import { TextComponent } from '../../text/component';
import { ComponentLoader } from '../../abstract/component-loader';

const componentCSS = require('./component.css');

export class AccordionItemInputData extends AbstractInputData {
   header?: string;
   componentData?: AbstractInputData;
   stateClazz?: string;
}

@customElement('component-accordion-item')
export class AccordionItemComponent extends AbstractComponent<AccordionItemInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'AccordionItemComponent';

   @property()
   componentData: AbstractInputData = <AbstractInputData>{};

   @property()
   header: string = '';

   @property()
   stateClazz: string = 'closed';

   render() {
      return html`<div class="accordion">
                           <div
                              class="accordionHeader" 
                              @click="${() => this.toogle()}"
                           >
                              <component-text text="${this.header}"></component-text>
                              <component-icon style="float:right;"
                                 iconClazz="${this.stateClazz == 'closed' ? 'fas fa-angle-right' : 'fas fa-angle-up'}"
                              ></component-icon>
                           </div>
                           <div class="accordionContent ${this.stateClazz}">
                              ${
                                 this.componentData != null
                                    ? ComponentLoader.INSTANCE.createComponentFromInputData(this.componentData)
                                    : ''
                              }
                                <slot></slot>                           
                           </div>
                        </div>
         </div>
      `;
   }

   async toogle() {
      console.log('accordion clicked, state=' + this.stateClazz);
      if ('open' == this.stateClazz) {
         this.stateClazz = 'closed';
      } else {
         this.stateClazz = 'open';
      }
      console.log('accordion clicked, after state=' + this.stateClazz);
      this.reqUpdate();
   }

   getDefaultInputData(): AccordionItemInputData {
      return <AccordionItemInputData>{
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
      this.componentData = this.basicService.getValue(this.inputData.componentData, AbstractInputData.prototype);
      this.header = this.basicService.getValue(this.inputData.header, '');
      this.stateClazz = this.basicService.getValue(this.inputData.stateClazz, '');
   }
}
