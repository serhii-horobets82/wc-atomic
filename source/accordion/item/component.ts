import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../../abstract-component/component';
import { ComponentLoader } from '../../abstract/component-loader';
import { TypographyInputData } from '../../typography/component';
import { BasicService } from '@domoskanonos/frontend-basis';

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
   componentData: AbstractInputData | undefined;

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
                              <component-typography text="${this.header}"></component-typography>
                              <component-icon style="float:right;"
                                 icon="${this.stateClazz == 'closed' ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}"
                              ></component-icon>
                           </div>
                           <div class="accordionContent ${this.stateClazz}">
                              ${
                                 this.componentData != undefined
                                    ? ComponentLoader.getUniqueInstance().createComponentFromInputData(this.componentData)
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
         componentData: TypographyInputData.prototype,
         stateClazz: 'closed'
      };
   }

   getOutputData(): any {
      return {};
   }

   protected inputDataChanged() {
      this.componentData = BasicService.getUniqueInstance().getValue(this.inputData.componentData, AbstractInputData.prototype);
      this.header = BasicService.getUniqueInstance().getValue(this.inputData.header, '');
      this.stateClazz = BasicService.getUniqueInstance().getValue(this.inputData.stateClazz, '');
   }
}
