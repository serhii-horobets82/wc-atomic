import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../../abstract-component/component';

const componentCSS = require('./component.css');

export class TableCompoundHeaderInputData extends AbstractInputData {
   text?: string;
   cssStyle?: string;
}

@customElement('component-table-compound-header')
export class TableCompoundHeader extends AbstractComponent<TableCompoundHeaderInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'AccordionItemComponent';

   @property()
   text: string = '';

   @property()
   cssStyle: string = '';

   render() {
      return html`
         <div class="compoundHeader" style="${this.cssStyle}">
            <component-text>${this.text}</component-text>
            <slot></slot>
         </div>
      `;
   }

   getDefaultInputData(): TableCompoundHeaderInputData {
      return <TableCompoundHeaderInputData>{
         componentIdentifier: TableCompoundHeader.IDENTIFIER,
         text: 'Mein Gruppierungskopf'
      };
   }

   getOutputData(): any {
      return {};
   }

   protected inputDataChanged() {
      this.text = this.basicService.getValue(this.inputData.text, '');
      this.cssStyle = this.basicService.getValue(this.inputData.cssStyle, '');
   }
}
