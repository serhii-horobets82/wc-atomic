import {html, LitElement, property, TemplateResult} from 'lit-element';
import {AbstractComponent} from '../../component/abstract/abstract-component';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {ComponentLoader} from '../../component/abstract/component-loader';
import {TemplateModel} from "./model";
import {DefaultTemplateModel} from "../default/model";

export abstract class Template<TEMPLATE_MODEL extends TemplateModel, OUTPUT_DATA> extends AbstractComponent<TEMPLATE_MODEL, OUTPUT_DATA> {

   protected constructor() {
      super();
      this.inputData = this.initTemplateData();
   }

   abstract initTemplateData() : TEMPLATE_MODEL;

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

    protected inputDataChanged(): void {
        let titleTag = document.getElementsByTagName("TITLE")[0];
        titleTag.textContent= this.inputData.title;
    }

    private loadComponent(inputData: any): AbstractComponent<any, any> {
      return ComponentLoader.INSTANCE.createComponentFromInputData(inputData);
   }
}
