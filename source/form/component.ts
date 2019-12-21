import { css, customElement, html, property, query, unsafeCSS } from 'lit-element';
import { InputComponent } from '../input/component';
import { AbstractComponent, AbstractInputData } from '../abstract-component/component';
import { FlexComponent, FlexContainerInputData } from '../flex-container/component';
import { ButtonComponent, ButtonInputData } from '../button/component';
import { guard } from 'lit-html/directives/guard';
import { repeat } from 'lit-html/directives/repeat';
import { ComponentLoader } from '../abstract/component-loader';
import { InputBoxComponent } from '..';

const componentCSS = require('./component.css');

export class KeyValueData {
   key: string = '';
   value: any;
}

export class FormComponentOutputData {
   jsonObject: any;
   formData: FormData = FormData.prototype;
}

export class FormComponentInputData extends AbstractInputData {
   gridClazz?: string;
   columnClazz?: string;
   buttonInputDatas?: ButtonInputData[];
   flexContainerInputData?: FlexContainerInputData;
}

@customElement('component-form')
export class FormComponent extends AbstractComponent<FormComponentInputData, FormComponentOutputData> {
   static IDENTIFIER: string = 'FormComponent';

   static EVENT_SUBMIT_BUTTON: string = 'component-form-submit-button-click';

   static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

   @property()
   gridClazz: string | undefined;

   @property()
   columnClazz: string | undefined;

   @property()
   buttonInputDatas: ButtonInputData[] = [];

   @property()
   flexContainerInputData: FlexContainerInputData | undefined;

   @query('#slotElement')
   slotElement: HTMLSlotElement | undefined;

   protected render() {
      return html`
         <form @component-button-click="${this.formButtonClicked}">
            <slot id="slotElement" @slotchange="${(event: Event) => this.slotChanged(event)}"></slot>
            ${guard(
               this.buttonInputDatas,
               () =>
                  html`
                     ${repeat(
                        this.buttonInputDatas,
                        (buttonInputData) => html`
                           ${ComponentLoader.INSTANCE.createComponentFromInputData(buttonInputData)}
                        `
                     )}
                  `
            )}
         </form>
      `;
   }

   slotChanged(event: Event) {
      let slotElement: HTMLSlotElement = <HTMLSlotElement>event.target;
      if (slotElement == null) {
         return;
      }
      let elements: Element[] = slotElement.assignedElements();
      for (let index = 0; index < elements.length; index++) {
         let element: Element = elements[index];
         element.classList.add('formElement');
      }
   }

   public getOutputData(): FormComponentOutputData {
      let formData = new FormData();
      let json: any = {};

      if (this.slotElement != null) {
         let elements: Element[] = this.slotElement.assignedElements();
         for (let elementIndex = 0; elementIndex < elements.length; elementIndex++) {
            let element: Element = elements[elementIndex];
            if (element instanceof InputComponent) {
               let elementOutputData = element.getOutputData();
               json[elementOutputData.key] = elementOutputData.value;
               formData.append(elementOutputData.key, elementOutputData.value);
            }
         }
      }

      let outputData = <FormComponentOutputData>{};
      outputData.jsonObject = json;

      outputData.formData = formData;

      return outputData;
   }

   getDefaultInputData(): FormComponentInputData {
      return <FormComponentInputData>{
         componentIdentifier: FormComponent.IDENTIFIER,
         buttonInputDatas: [
            <ButtonInputData>{
               componentIdentifier: ButtonComponent.IDENTIFIER,
               text: 'Senden'
            }
         ],
         flexContainerInputData: <FlexContainerInputData>{
            componentIdentifier: FlexComponent.IDENTIFIER
         }
      };
   }

   inputDataChanged(): void {
      this.gridClazz = this.inputData.gridClazz;
      this.columnClazz = this.inputData.columnClazz;
      this.buttonInputDatas = this.inputData.buttonInputDatas !== undefined ? this.inputData.buttonInputDatas : [];
      this.flexContainerInputData = this.inputData.flexContainerInputData;
   }

   private formButtonClicked(event: CustomEvent) {
      console.log('formButton clicked: ' + event.detail);
      let buttonIdentifier = event.detail;
      switch (buttonIdentifier) {
         case 'submitButton':
            this.dispatchSimpleCustomEvent(FormComponent.EVENT_SUBMIT_BUTTON, this.getOutputData());
            break;
      }
   }
}
