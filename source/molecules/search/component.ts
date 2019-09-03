import {css, customElement, html, query, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/component/component';
import {KeyValueOutputData} from '../../organisms/form/component';
import {TextfieldComponent} from '../../atoms/textfield/component';
import {SearchInputData} from "./model";

const componentCSS = require('./component.css');

@customElement('component-search')
export class SearchComponent extends AbstractComponent<SearchInputData, any> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'SearchComponent';

   static EVENT_CLICK: string = 'component-search';

   @query('#textfieldComponent')
   textfieldComponent: TextfieldComponent;

   render() {
      return html`
         <div class="searchBox">
            <component-textfield id="textfieldComponent"></component-textfield
            ><component-icon
               iconClazz="icon-search" clickable="true"
               @component-icon-click="${this.clicked}"
            ></component-icon>
         </div>
      `;
   }

   async clicked(event: Event) {
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
         ? (<KeyValueOutputData>this.textfieldComponent.getOutputData()).value
         : '';
   }

   protected inputDataChanged() {}

   getEventList(): string[] {
      return [SearchComponent.EVENT_CLICK];
   }
}
