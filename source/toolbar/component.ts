import { css, customElement, html, property, unsafeCSS } from 'lit-element';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { ComponentLoader } from '../abstract/component-loader';
import { guard } from 'lit-html/directives/guard';
import { repeat } from 'lit-html/directives/repeat';
import { IconComponent } from '../icon/component';
import { AuthenticatedIconComponent } from '../authenticated-icon/component';

const componentCSS = require('./component.css');

export class ToolbarInputData extends AbstractInputData {
   clazz?: string;
   leftInputData: AbstractInputData[] = [];
   mainInputData: AbstractInputData[] = [];
   rightInputData: AbstractInputData[] = [];
}

@customElement('component-toolbar')
export class ToolbarComponent extends AbstractComponent<ToolbarInputData, undefined> {
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

   @property()
   clazz: string = 'toolbar';

   constructor() {
      super();
   }

   render() {
      return html`
         <div class="${this.clazz}">
            <component-flex-container gridClazz="grid_100 alignItemsCenter justifyContentSpaceBetween">
               <component-flex-container gridClazz="grid_100 alignItemsCenter justifyContentSpaceBetween">
                  ${guard(
                     this.leftInputData,
                     () =>
                        html`
                           ${repeat(
                              this.leftInputData,
                              (inputData) => html`
                                 ${ComponentLoader.INSTANCE.createComponentFromInputData(inputData)}
                              `
                           )}
                        `
                  )}
                  <slot name="leftComponents"></slot>
               </component-flex-container>
               <component-flex-container gridClazz="grid_100 alignItemsCenter justifyContentSpaceBetween">
                  ${guard(
                     this.mainInputData,
                     () =>
                        html`
                           ${repeat(
                              this.mainInputData,
                              (inputData) => html`
                                 ${ComponentLoader.INSTANCE.createComponentFromInputData(inputData)}
                              `
                           )}
                        `
                  )}<slot name="mainComponents"></slot>
               </component-flex-container>
               <component-flex-container gridClazz="grid_100 alignItemsCenter justifyContentSpaceBetween">
                  ${guard(
                     this.rightInputData,
                     () =>
                        html`
                           ${repeat(
                              this.rightInputData,
                              (inputData) => html`
                                 ${ComponentLoader.INSTANCE.createComponentFromInputData(inputData)}
                              `
                           )}
                        `
                  )}
                  <slot name="rightComponents"></slot>
               </component-flex-container>
            </component-flex-container>
         </div>
      `;
   }

   getDefaultInputData(): ToolbarInputData {
      return <ToolbarInputData>{
         componentIdentifier: ToolbarComponent.IDENTIFIER,
         leftInputData: [new IconComponent().getDefaultInputData()],
         mainInputData: [],
         rightInputData: [new AuthenticatedIconComponent().getDefaultInputData()]
      };
   }

   getOutputData(): any {
      return undefined;
   }

   protected inputDataChanged() {
      this.clazz = this.basicService.getValue(this.inputData.clazz, 'toolbar');
      this.leftInputData = this.inputData.leftInputData;
      this.mainInputData = this.inputData.mainInputData;
      this.rightInputData = this.inputData.rightInputData;
   }
}