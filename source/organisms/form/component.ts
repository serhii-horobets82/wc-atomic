import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {TextfieldComponent} from '../../atoms/textfield/component';
import {FormLabelComponent} from '../../atoms/form-label/component';
import {DateComponent} from '../../atoms/date/component';
import {CheckboxComponent} from '../../atoms/checkbox/component';
import {ColorComponent} from '../../atoms/color/component';
import {TextareaComponent} from '../../atoms/textarea/component';
import {ComboboxComponent} from '../../atoms/combobox/component';
import {RangeSliderComponent} from '../../atoms/range-slider/component';
import {FlexContainer, FormComponentModel, FormElement} from '../../interface/atoms';
import {AbstractComponent} from '../../abstract/abstract-component';
import {FlexComponent} from '../flex-container/component';
import {ButtonComponent} from '../../atoms/button/component';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {ComponentLoader} from '../../abstract/component-loader';
import {Button} from "../../atoms/button/model";

const componentCSS = require('./component.css');

export interface KeyValueOutputData {
   key: string;
   value: any;
}

@customElement('component-form')
export class FormComponent extends AbstractComponent<FormComponentModel, any> {
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
   buttonInputDatas: Button[];

   @query('#flexContainer')
   flexContainerComponent: FlexComponent;
   flexContainerInputData: FlexContainer;

   protected render() {
      return html`
         <form
            id="formElement"
            novalidate
            @component-button-click="${this.formButtonClicked}"
         >
            <component-flex-container
               id="flexContainer"
               .inputData="${this.flexContainerInputData}"
            ></component-flex-container>

            ${guard(
               this.buttonInputDatas,
               () =>
                  html`
                     ${repeat(
                        this.buttonInputDatas,
                        (buttonInputData, index) => html`
                           ${ComponentLoader.INSTANCE.createComponentFromInputData(
                              buttonInputData
                           )}
                        `
                     )}
                  `
            )}
         </form>
      `;
   }

   getOutputData(): any {
      let outputData: any = [];
      this.flexContainerComponent.componentsInputData.forEach(
         (componentData) => {
            let abstractComponent = this.flexContainerComponent.componentsMap.get(
               componentData
            );
            if (abstractComponent !== undefined) {
               let componentOutputData: any = abstractComponent.getOutputData();
               outputData.push({
                  [componentOutputData['key']]: componentOutputData['value']
               });
            }
         }
      );
      //console.log('current form outputData: ' + JSON.stringify(outputData));
      return outputData;
   }

   getDefaultInputData(): FormComponentModel {
      return <FormComponentModel>{
         componentIdentifier: FormComponent.IDENTIFIER,
         buttonInputDatas: [
            <Button>{
               componentIdentifier: ButtonComponent.IDENTIFIER,
               text: 'Senden'
            }
         ],
         flexContainerInputData: <FlexContainer>{
            componentIdentifier: FlexComponent.IDENTIFIER,
            gridClazz: 'grid_100',
            columnFlexBasisValue: '30%',
            componentsInputData: [
               <FormElement>{
                  componentIdentifier: FormLabelComponent.IDENTIFIER,
                  label: 'Gib deinen Namen ein',
                  componentData: new TextfieldComponent().getDefaultInputData()
               },
               <FormElement>{
                  componentIdentifier: FormLabelComponent.IDENTIFIER,
                  label: 'Dein Geburtsdatum',
                  componentData: new DateComponent().getDefaultInputData()
               },
               <FormElement>{
                  componentIdentifier: FormLabelComponent.IDENTIFIER,
                  label:
                     'Möchtest du übermäßig viele Emails von uns bekommen ?',
                  componentData: new CheckboxComponent().getDefaultInputData()
               },
               <FormElement>{
                  componentIdentifier: FormLabelComponent.IDENTIFIER,
                  label: 'Gib deine Lieblingsfarbe ein',
                  componentData: new ColorComponent().getDefaultInputData()
               },
               <FormElement>{
                  componentIdentifier: FormLabelComponent.IDENTIFIER,
                  label: 'Beschreibe dich',
                  componentData: new TextareaComponent().getDefaultInputData()
               },
               <FormElement>{
                  componentIdentifier: FormLabelComponent.IDENTIFIER,
                  label: 'Eine Auswahl',
                  componentData: new ComboboxComponent().getDefaultInputData()
               },
               <FormElement>{
                  componentIdentifier: FormLabelComponent.IDENTIFIER,
                  label: 'Eine Auswahl',
                  componentData: new RangeSliderComponent().getDefaultInputData()
               }
            ]
         }
      };
   }

   inputDataChanged(): void {
      this.gridClazz = this.inputData.gridClazz;
      this.columnClazz = this.inputData.columnClazz;
      this.buttonInputDatas =
         this.inputData.buttonInputDatas !== undefined
            ? this.inputData.buttonInputDatas
            : [];
      this.flexContainerInputData = this.inputData.flexContainerInputData;
   }

   private formButtonClicked(event: CustomEvent) {
      console.log('formButton clicked: ' + event.detail);
      let buttonIdentifier = event.detail;
      switch (buttonIdentifier) {
         case 'submitButton':
            this.dispatchSimpleCustomEvent(
               FormComponent.EVENT_SUBMIT_BUTTON,
               this.getOutputData()
            );
            break;
      }
   }
}
