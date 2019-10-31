import {css, customElement, html, property, query, unsafeCSS} from 'lit-element';
import {AbstractComponent} from '../../abstract-component/component';
import {InputComponent} from '../../input/input/component';
import {ComponentLoader} from '../../abstract/component-loader';
import {FormElementInputData, FormElementOutputData} from "./model";

const componentCSS = require('./component.css');

@customElement('component-form-element')
export class FormElementComponent extends AbstractComponent<FormElementInputData,
    FormElementOutputData> {
    static styles = css`
      ${unsafeCSS(componentCSS)}
   `;

    static IDENTIFIER: string = 'FormLabelComponent';

    @property()
    label: string = '';

    @query('#slotElement')
    slotElement: HTMLSlotElement | undefined;

    render() {
        return html`
         <div class="formElement">
            <label>
               ${this.label}
            </label>
            <slot id="slotElement"></slot>
         </div>
      `;
    }

    getDefaultInputData(): FormElementInputData {
        return <FormElementInputData>{
            componentIdentifier: FormElementComponent.IDENTIFIER,
            label: 'formLabel',
            componentData: new InputComponent().getDefaultInputData()
        };
    }

    protected inputDataChanged() {
        this.label = this.inputData.label;
    }

    getOutputData(): FormElementOutputData {
        let outputData: FormElementOutputData = <FormElementOutputData>{};
        outputData.data = [];
        if (this.slotElement != null) {
            let elements: Element[] = this.slotElement.assignedElements();
            for (let index = 0; index < elements.length; index++) {
                let element: Element = elements[index];
                if (element instanceof AbstractComponent) {
                    let elementOutputData = element.getOutputData();
                    console.log('output data of element: ' + element.tagName + ', data=' + JSON.stringify(elementOutputData));
                    outputData.data.push(elementOutputData);
                }
            }
        }
        return outputData;
    }
}
