import {css, customElement, html, property, unsafeCSS} from 'lit-element';
import {AbstractComponent, AbstractInputData} from '../abstract-component/component';
import {ComponentLoader} from '../abstract/component-loader';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {FlexJustifyContent} from "../flex-container/component";

const componentCSS = require('./component.css');


export class ToolbarInputData extends AbstractInputData {
    toolbarInputData: AbstractInputData[] = [];
    justifyContent: string = FlexJustifyContent.FLEX_START;
}

@customElement('component-toolbar')
export class ToolbarComponent extends AbstractComponent<ToolbarInputData, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ToolbarComponent';

    @property()
    toolbarInputData: AbstractInputData[] = [];

    @property()
    justifyContent: string = FlexJustifyContent.FLEX_START;

    constructor() {
      super();
   }

   render() {
      return html`
         <div class="toolbar" style="justify-content:${this.justifyContent};">
            <slot></slot>
            ${guard(
          this.toolbarInputData,
          () =>
              html`
                     ${repeat(
                  this.toolbarInputData,
                  (inputData) => html`
                           ${ComponentLoader.INSTANCE.createComponentFromInputData(inputData)}
                        `
              )}
                  `
      )}
         </div>
      `;
   }

   getDefaultInputData(): ToolbarInputData {
       return <ToolbarInputData>{};
   }

   getOutputData(): any {
      return undefined;
   }

   protected inputDataChanged() {
       this.toolbarInputData = this.inputData.toolbarInputData;
       this.justifyContent = this.basicService.getValue(this.justifyContent, FlexJustifyContent.FLEX_START);
   }
}
