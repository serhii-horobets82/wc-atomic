import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../../abstract-component/component';

const componentCSS = require('./component.css');

export class TabContentInputData extends AbstractInputData {
   hide: boolean = true;
}

@customElement('component-tab-content')
export class TabContentComponent extends AbstractComponent<TabContentInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'TabContentComponent';

   @property()
   selected: boolean = false;

   render() {
      return html`
         <div class="${this.selected ? '' : 'hide'}"><slot></slot></div>
      `;
   }

   getDefaultInputData(): any {
      return <TabContentInputData>{};
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
      this.selected = this.inputData.hide;
   }
}
