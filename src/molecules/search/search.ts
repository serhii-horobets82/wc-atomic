import {css, customElement, html, query, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract/abstract-component';
import {KeyValueOutputData} from '../../organisms/form/container/organism';
import {TextfieldComponent} from '../../atoms/textfield/component';
import {Search} from "../../interface/atoms";

const componentCSS = require('./search.scss');

@customElement('component-search')
export class SearchComponent extends AbstractComponent<Search, any> {
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

   getDefaultInputData(): Search {
      return <Search>{ componentIdentifier: SearchComponent.IDENTIFIER };
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
