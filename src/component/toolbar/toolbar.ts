import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent } from '../../abstract/abstract-component';
import { AbstractInputData, Toolbar } from '../../interface/atoms';
import { ComponentLoader } from '../../abstract/component-loader';
import { guard } from 'lit-html/directives/guard';
import { repeat } from 'lit-html/directives/repeat';
import {IconComponent} from "../icon/icon";

const componentCSS = require('./toolbar.scss');

@customElement('component-toolbar')
export class ToolbarComponent extends AbstractComponent<Toolbar, undefined> {
   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   static IDENTIFIER: string = 'ToolbarComponent';

   @property()
   leftInputData: AbstractInputData[] = [];

   @property()
   mainInputData: AbstractInputData[] = [];

   @property()
   rightInputData: AbstractInputData[] = [];

   constructor() {
      super();
   }

   render() {
      return html`
         <div class="toolbar">
            <component-flex-container
               gridClazz="grid_100 alignItemsCenter justifyContentSpaceBetween"
            >
               <component-flex-container gridClazz="grid_100 alignItemsCenter justifyContentSpaceBetween">
                  ${guard(
                     this.leftInputData,
                     () =>
                        html`
                           ${repeat(
                              this.leftInputData,
                              (inputData, index) => html`
                                 ${ComponentLoader.INSTANCE.createComponentFromInputData(
                                    inputData
                                 )}
                              `
                           )}
                        `
                  )}
               </component-flex-container>
               <component-flex-container gridClazz="grid_100 alignItemsCenter justifyContentSpaceBetween">
                  ${guard(
                     this.mainInputData,
                     () =>
                        html`
                           ${repeat(
                              this.mainInputData,
                              (inputData, index) => html`
                                 ${ComponentLoader.INSTANCE.createComponentFromInputData(
                                    inputData
                                 )}
                              `
                           )}
                        `
                  )}
               </component-flex-container>
               <component-flex-container gridClazz="grid_100 alignItemsCenter justifyContentSpaceBetween">
                  ${guard(
                     this.rightInputData,
                     () =>
                        html`
                           ${repeat(
                              this.rightInputData,
                              (inputData, index) => html`
                                 ${ComponentLoader.INSTANCE.createComponentFromInputData(
                                    inputData
                                 )}
                              `
                           )}
                        `
                  )}
               </component-flex-container>
            </component-flex-container>
         </div>
      `;
   }

   getDefaultInputData(): Toolbar {
      return <Toolbar>{
         componentIdentifier: ToolbarComponent.IDENTIFIER,
         leftInputData: [new IconComponent().getDefaultInputData()],
         mainInputData: [],
         rightInputData: []
      };
   }

   getOutputData(): any {
      return undefined;
   }

   protected inputDataChanged() {}
}
