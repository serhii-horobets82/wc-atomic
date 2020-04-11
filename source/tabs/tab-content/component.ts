import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../../abstract-component/component';
import { TabInputData, VisibleType } from '../..';
import { BasicService } from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');

export class TabContentInputData extends AbstractInputData {
   selected: boolean = true;
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
         <effect-visible visibleType="${this.selected ? VisibleType.NORMAL : VisibleType.HIDE}">
            <slot></slot>
         </effect-visible>
      `;
   }

   getOutputData(): undefined {
      return undefined;
   }

   protected inputDataChanged() {
      let defaultData: TabContentInputData = new TabContentInputData();
      this.selected = BasicService.getUniqueInstance().getValue(this.inputData.selected, defaultData.selected);
   }
}
