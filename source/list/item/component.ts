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
         <div class="listItem ${this.clazz}">
            <slot></slot>
         </div>
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
      this.clazz = BasicService.getUniqueInstance().getValue(this.inputData.clazz, '');
      this.content = BasicService.getUniqueInstance().getValue(this.inputData.content, '');
   }
}
