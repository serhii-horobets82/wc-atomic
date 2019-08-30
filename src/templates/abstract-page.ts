import { html, LitElement, property, TemplateResult } from 'lit-element';
import { AbstractComponent } from '../component/abstract/abstract-component';
import { guard } from 'lit-html/directives/guard';
import { repeat } from 'lit-html/directives/repeat';
import { ComponentLoader } from '../component/abstract/component-loader';
import { AbstractInputData } from '../interface/atoms';

export interface Page {
   title: string;
   componentInputData: AbstractInputData[];
}

export abstract class AbstractPage extends LitElement {
   @property()
   pageData: Page;

   protected constructor() {
      super();
      this.pageData = <Page>{ title: 'Mein Titel', componentInputData: [] };
   }

   getContent(): TemplateResult {
      return html`
         ${guard(
            [this.pageData.componentInputData],
            () =>
               html`
                  ${repeat(
                     this.pageData.componentInputData,
                     (componentInputData) =>
                        html`
                           ${this.loadComponent(componentInputData)}
                        `
                  )}
               `
         )}
      `;
   }

   private loadComponent(inputData: any): AbstractComponent<any, any> {
      return ComponentLoader.INSTANCE.createComponentFromInputData(inputData);
   }
}
