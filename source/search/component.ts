import { css, customElement, html, query, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { InputComponent } from '../input/component';
import { KeyValueData } from '../form/component';

const componentCSS = require('./component.css');

export class SearchInputData extends AbstractInputData {}

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
            <component-inputfield id="textfieldComponent" trailingIcon="search"></component-inputfield>
      `;
   }

   async clicked() {
      this.dispatchSimpleCustomEvent(SearchComponent.EVENT_CLICK, this.getOutputData());
   }

   getDefaultInputData(): SearchInputData {
      return <SearchInputData>{ componentIdentifier: SearchComponent.IDENTIFIER };
   }

   getOutputData(): any {
      return this.textfieldComponent != null ? (<KeyValueData>this.textfieldComponent.getOutputData()).value : '';
   }

   protected inputDataChanged() {}

   getEventList(): string[] {
      return [SearchComponent.EVENT_CLICK];
   }
}
