import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { ComponentLoader } from '../abstract/component-loader';
import { guard } from 'lit-html/directives/guard';
import { repeat } from 'lit-html/directives/repeat';
import { FlexJustifyContent, InputfieldType, IconInputData, InputBoxInputData } from '..';

const componentCSS = require('./component.css');

export class SearchBarInputData extends AbstractInputData {}

export class SearchBarOutputData {}

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
   leadingIcon: IconInputData = <IconInputData>{ icon: 'menu' };
   @property()
   trailingIcon: IconInputData = <IconInputData>{ icon: 'menu' };

   render() {
      return html`
         <div class="search-bar" style="">
            <slot></slot>
            <component-inputfield
               .automaticInfoText="${false}"
               @component-inputfield-focus="${() => this.textfieldOnFocus()}"
               @component-inputfield-focus-out="${() => this.textfieldOnFocusOut()}"
               .inputfieldType="${InputfieldType.TEXT}"
               .inputBoxInputData="${<InputBoxInputData>{
                  selected: false,
                  leadingIcon: this.leadingIcon,
                  trailingIcon: this.trailingIcon
               }}}"
            ></component-inputfield>
         </div>
      `;
   }

   getOutputData(): SearchBarOutputData {
      return new SearchBarOutputData();
   }

   protected inputDataChanged() {}

   private textfieldOnFocus() {
      //this.trailingIcon = 'close';
   }

   private textfieldOnFocusOut() {
      //this.trailingIcon = 'search';
   }
}
