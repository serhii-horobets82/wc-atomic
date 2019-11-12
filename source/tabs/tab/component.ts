import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../../abstract-component/component';

const componentCSS = require('./component.css');

export class TabInputData extends AbstractInputData {
   clazz?: string;
}

@customElement('component-tab')
export class TabComponent extends AbstractComponent<TabInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'TabComponent';

   static EVENT_CLICK: string = 'component-tab-click';

   @property()
   selected: boolean = false;

   @property()
   tabContentId: string = '';

   render() {
      return html`
         <div class="tab ${this.selected ? 'selected' : ''}" @click="${() => this.tabClicked()}"><slot></slot></div>
      `;
   }

   getDefaultInputData(): any {
      return <TabInputData>{};
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {}

   private tabClicked(): void {
      console.log('tab clicked, render content for querySelector: ' + this.tabContentId);
      this.dispatchSimpleCustomEvent(TabComponent.EVENT_CLICK, this.tabContentId);
   }
}
