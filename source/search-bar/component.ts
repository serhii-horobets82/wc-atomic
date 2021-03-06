import { css, customElement, html, property, query, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { InputfieldType, IconInputData, KeyValueData, InputfieldComponent } from '..';
import { EventIconClickData } from '../icon/component';
import { BasicService } from '@domoskanonos/frontend-basis';

const componentCSS = require('./component.css');

export class SearchBarInputData extends AbstractInputData {}

export class SearchBarState {
   static NORMAL: string = 'NORMAL';
   static SEARCH: string = 'SEARCH';
   static MOUSE_OUT: string = 'MOUSE_OUT';
}

export class SearchBarOutputData {
   value: string = '';
}

@customElement('component-search-bar')
export class SearchBarComponent extends AbstractComponent<SearchBarInputData, SearchBarOutputData> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'SearchBarComponent';

   constructor() {
      super();
   }

   @property()
   placeholder: string = '';

   @property()
   trailingIcon: string = '';

   @property()
   value: string = '';

   @query('#inputfieldComponent')
   private inputfieldComponent: InputfieldComponent | undefined;

   render() {
      return html`
         <div class="search-bar">
            <slot></slot>
            <component-icon icon="search"></component-icon>
            <component-inputfield
               id="inputfieldComponent"
               @component-inputfield-keyup="${() => this.textfieldKeyUp()}"
               @component-icon-click="${(event: CustomEvent) => {
                  this.textfieldIconClicked(event);
               }}"
               placeholder="${this.placeholder}"
               value="${this.value}"
               .automaticInfoText="${false}"
               .inputfieldType="${InputfieldType.TEXT}"
               trailingIcon="${this.trailingIcon}"
               .leadingIconClickable="${true}"
               .trailingIconClickable="${true}"
            ></component-inputfield>
         </div>
      `;
   }

   getOutputData(): SearchBarOutputData {
      let searchBarOutputData = new SearchBarOutputData();
      if (this.inputfieldComponent != null && this.inputfieldComponent.inputElemet != null) {
         searchBarOutputData.value = this.inputfieldComponent.inputElemet.value;
      }
      return searchBarOutputData;
   }

   protected inputDataChanged() {}

   private textfieldIconClicked(event: CustomEvent) {
      let data: EventIconClickData = event.detail;
      switch (data.icon) {
         case 'close':
            if (this.inputfieldComponent != null && this.inputfieldComponent.inputElemet != null) {
               this.inputfieldComponent.inputElemet.value = '';
               this.inputfieldComponent.inputElemet.focus();
            }
            this.setTrailingIcon();
            break;
      }
   }

   private textfieldKeyUp() {
      this.setTrailingIcon();
   }

   private setTrailingIcon() {
      if (BasicService.getUniqueInstance().isNotBlank(this.getOutputData().value)) {
         this.trailingIcon = 'close';
      } else {
         this.trailingIcon = '';
      }
   }
}
