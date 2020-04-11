import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../../abstract-component/component';
import { BasicService, I18nService } from '@domoskanonos/frontend-basis';
import { BorderType, TypographyType } from '../..';

const componentCSS = require('./component.css');

export class TabInputData extends AbstractInputData {
   selected: boolean = false;
   text: string = '';
}

@customElement('component-tab')
export class TabComponent extends AbstractComponent<TabInputData, TabComponent> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'TabComponent';

   static EVENT_CLICK: string = 'component-tab-click';

   @property()
   selected: boolean = false;

   @property()
   text: string = '';

   render() {
      return html`
         <span class="tab" @click="${() => this.tabClicked()}">
            <component-border borderType="${this.selected ? BorderType.BOTTOM_SELECTED : BorderType.BOTTOM}">
               ${BasicService.getUniqueInstance().isNotBlank(this.text)
                  ? html`
                       <component-typography
                          .typographyType="${TypographyType.OVERLINE}"
                          text="${this.text}"
                       ></component-typography>
                    `
                  : html``}

               <slot></slot>
            </component-border>
         </span>
      `;
   }

   getOutputData(): TabComponent {
      return this;
   }

   protected inputDataChanged() {
      let defaultData: TabInputData = new TabInputData();
      this.selected = BasicService.getUniqueInstance().getValue(this.inputData.selected, defaultData.selected);
      this.text = BasicService.getUniqueInstance().getValue(this.inputData.text, defaultData.text);
   }

   private tabClicked(): void {
      console.log('tab clicked.');
      this.dispatchSimpleCustomEvent(TabComponent.EVENT_CLICK, this.getOutputData());
   }
}
