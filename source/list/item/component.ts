import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../../abstract-component/component';
import { BasicService } from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');

export class ListItemInputData extends AbstractInputData {
   clazz?: string;
   content?: AbstractInputData[];
}

@customElement('component-list-item')
export class ListItemComponent extends AbstractComponent<ListItemInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ListItemComponent';

   @property()
   content: AbstractInputData[] = [];

   @property()
   clazz: string = '';

   render() {
      return html`
         <component-ripple>
            <div class="listItem ${this.clazz}">
               <component-flex-container>
                  <slot></slot>
               </component-flex-container></div
         ></component-ripple>
      `;
   }

   getDefaultInputData(): ListItemInputData {
      return <ListItemInputData>{
         componentIdentifier: ListItemComponent.IDENTIFIER,
         content: []
      };
   }

   getOutputData(): any {
      return {};
   }

   protected inputDataChanged() {
      this.clazz = BasicService.getInstance().getValue(this.inputData.clazz, '');
      this.content = BasicService.getInstance().getValue(this.inputData.content, '');
   }
}
