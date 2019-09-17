import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {TextfieldComponent} from '../../atoms/textfield/component';
import {FormElementComponent} from '../../atoms/form-element/component';
import {DateComponent} from '../../atoms/date/component';
import {CheckboxComponent} from '../../atoms/checkbox/component';
import {ColorComponent} from '../../atoms/color/component';
import {TextareaComponent} from '../../atoms/textarea/component';
import {ComboboxComponent} from '../../atoms/combobox/component';
import {RangeSliderComponent} from '../../atoms/range-slider/component';
import {AbstractComponent} from '../../abstract/component/component';
import {FlexComponent} from '../flex-container/component';
import {ButtonComponent} from '../../atoms/button/component';
import {guard} from 'lit-html/directives/guard';
import {repeat} from 'lit-html/directives/repeat';
import {ComponentLoader} from '../../abstract/component-loader';
import {Button} from "../../atoms/button/model";
import {FormElementInputData, FormElementOutputData} from "../../atoms/form-element/model";
import {FormComponentInputData, FormComponentOutputData} from "./model";
import {FlexContainerInputData} from "../flex-container/model";
import {getTypeScriptInstance} from "ts-loader/dist/types/instances";

const componentCSS = require('./component.css');

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
    buttonInputDatas: Button[] = [];

    @property()
    flexContainerInputData: FlexContainerInputData | undefined;

    @query('#slotElement')
    slotElement: HTMLSlotElement | undefined;

    protected render() {
        return html`  
         <form
            novalidate
            @component-button-click="${this.formButtonClicked}"
         >

            <slot id="slotElement"></slot>
            ${guard(
            this.buttonInputDatas,
            () =>
                html`
                     ${repeat(
                    this.buttonInputDatas,
                    (buttonInputData) => html`
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

    public getOutputData(): FormComponentOutputData {

        let formData = new FormData();
        let json: string = '{';
        let formElementIndex = 0;
        if (this.slotElement != null) {
            let elements: Element[] = this.slotElement.assignedElements();
            for (let elementIndex = 0; elementIndex < elements.length; elementIndex++) {
                let element: Element = elements[elementIndex];
                if (element instanceof FormElementComponent) {
                    let elementOutputData = element.getOutputData();
                    for (const value of elementOutputData.data) {
                        if (formElementIndex > 0) {
                            json = json.concat(',');
                        }
                        json = json.concat('"');
                        json = json.concat(value.key);
                        json = json.concat('":"');
                        json = json.concat(value.value);
                        json = json.concat('"');
                        formElementIndex++;
                        formData.append(value.key, value.value);
                    }
                }
            }
        }
        json = json.concat('}');
        console.log('form outputData: ' + json);

        let outputData = <FormComponentOutputData>{};
        outputData.jsonObject = JSON.parse(json);
        outputData.formData = formData;

        return outputData;
    }

    getDefaultInputData(): FormComponentInputData {
        return <FormComponentInputData>{
            componentIdentifier: FormComponent.IDENTIFIER,
            buttonInputDatas: [
                <Button>{
                    componentIdentifier: ButtonComponent.IDENTIFIER,
                    text: 'Senden'
                }
            ],
            flexContainerInputData: <FlexContainerInputData>{
                componentIdentifier: FlexComponent.IDENTIFIER,
                gridClazz: 'grid_100',
                columnFlexBasisValue: '30%',
                componentsInputData: [
                    <FormElementInputData>{
                        componentIdentifier: FormElementComponent.IDENTIFIER,
                        label: 'Gib deinen Namen ein',
                        componentData: new TextfieldComponent().getDefaultInputData()
                    },
                    <FormElementInputData>{
                        componentIdentifier: FormElementComponent.IDENTIFIER,
                        label: 'Dein Geburtsdatum',
                        componentData: new DateComponent().getDefaultInputData()
                    },
                    <FormElementInputData>{
                        componentIdentifier: FormElementComponent.IDENTIFIER,
                        label:
                            'Möchtest du übermäßig viele Emails von uns bekommen ?',
                        componentData: new CheckboxComponent().getDefaultInputData()
                    },
                    <FormElementInputData>{
                        componentIdentifier: FormElementComponent.IDENTIFIER,
                        label: 'Gib deine Lieblingsfarbe ein',
                        componentData: new ColorComponent().getDefaultInputData()
                    },
                    <FormElementInputData>{
                        componentIdentifier: FormElementComponent.IDENTIFIER,
                        label: 'Beschreibe dich',
                        componentData: new TextareaComponent().getDefaultInputData()
                    },
                    <FormElementInputData>{
                        componentIdentifier: FormElementComponent.IDENTIFIER,
                        label: 'Eine Auswahl',
                        componentData: new ComboboxComponent().getDefaultInputData()
                    },
                    <FormElementInputData>{
                        componentIdentifier: FormElementComponent.IDENTIFIER,
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
