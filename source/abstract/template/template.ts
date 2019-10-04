import {html, TemplateResult} from 'lit-element';
import {AbstractComponent} from '../component/component';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {ComponentLoader} from '../component-loader';
import {TemplateInputData} from "./model";

export abstract class Template<TEMPLATE_MODEL extends TemplateInputData, OUTPUT_DATA> extends AbstractComponent<TEMPLATE_MODEL, OUTPUT_DATA> {

    constructor() {
      super();
        //this.inputData = this.initTemplateData();
   }

    //abstract initTemplateData() : TEMPLATE_MODEL;

   getContent(): TemplateResult {
      return html`
         ${guard(
            [this.inputData.componentInputData],
            () =>
               html`
                  ${repeat(
                     this.inputData.componentInputData,
                     (componentInputData) =>
                        html`
                           ${this.loadComponent(componentInputData)}
                        `
                  )}
               `
         )}
      `;
   }

    inputDataChanged(): void {
        let titleTag = document.getElementsByTagName("TITLE")[0];
        titleTag.textContent= this.inputData.title;
    }

    private loadComponent(inputData: any): AbstractComponent<any, any> {
      return ComponentLoader.INSTANCE.createComponentFromInputData(inputData);
   }

}
