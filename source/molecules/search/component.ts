import {css, customElement, html, query, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract-component/component';
import {InputComponent} from '../../input/input/component';
import {SearchInputData} from "./model";
import {KeyValueData} from "../../organisms/form/model";

const componentCSS = require('./component.css');

@customElement('component-search')
export class SearchComponent extends AbstractComponent<SearchInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'SearchComponent';

   static EVENT_CLICK: string = 'component-search';

   @query('#textfieldComponent')
   textfieldComponent: InputComponent | undefined;

   render() {
      return html`
         <div class="searchBox">
            <component-inputfield id="textfieldComponent"></component-inputfield
            ><component-icon
               iconClazz="icon-search" clickable="true"
               @component-icon-click="${this.clicked}"
            ></component-icon>
         </div>
      `;
   }

   async clicked() {
      this.dispatchSimpleCustomEvent(
         SearchComponent.EVENT_CLICK,
         this.getOutputData()
      );
   }

   getDefaultInputData(): SearchInputData {
      return <SearchInputData>{ componentIdentifier: SearchComponent.IDENTIFIER };
   }

   getOutputData(): any {
      return this.textfieldComponent != null
          ? (<KeyValueData>this.textfieldComponent.getOutputData()).value
         : '';
   }

   protected inputDataChanged() {}

   getEventList(): string[] {
      return [SearchComponent.EVENT_CLICK];
   }
}
