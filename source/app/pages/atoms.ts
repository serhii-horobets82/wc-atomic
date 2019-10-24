import {DefaultTemplate} from "../../templates/default/template";
import {customElement, TemplateResult, html} from "lit-element";
import {DefaultTemplateModel} from "../../templates/default/model";
import {ImgComponent} from "../../atoms/img/component";
import {ButtonComponent} from "../../atoms/button/component";
import {CodeComponent} from "../../atoms/code/component";
import {ComboboxComponent} from "../../input/combobox/component";
import {FormElementComponent} from "../../atoms/form-element/component";
import {H1Component, HComponent} from "../../atoms/h/component";
import {IconComponent} from "../../atoms/icon/component";
import {LinkComponent} from "../../atoms/link/component";
import {NavigationComponent} from "../../atoms/navigation/component";
import {TextComponent} from "../../atoms/text/component";
import {TextareaComponent} from "../../input/textarea/component";
import {InputComponent} from "../../input/input/component";
import {getNAV} from "../app-showcase";
import {AbstractBalcoPage} from "./abstract-balco-page";


@customElement('page-atoms')
export class AtomsPage extends AbstractBalcoPage {

    constructor() {
        super();
    }

    initTemplateData(): DefaultTemplateModel {
        return <DefaultTemplateModel>{
            componentIdentifier: DefaultTemplate.IDENTIFIER,
        }
    }

    getContent(): TemplateResult {
        return html`
             <component-flex-container gridClazz="grid_75" columnFlexBasisValue="100%;">
                <component-accordion>
                    <component-accordion-item header="Button">
                        <component-component-viewer .componentInputData="${new ButtonComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                    <component-accordion-item header="Code">
                        <component-component-viewer .componentInputData="${new CodeComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                    <component-accordion-item header="Combobox">
                        <component-component-viewer .componentInputData="${new ComboboxComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item>
                    <component-accordion-item header="Form-Label">
                        <component-component-viewer .componentInputData="${new FormElementComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                    <component-accordion-item header="H">
                        <component-component-viewer .componentInputData="${new H1Component().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                    <component-accordion-item header="Icon">
                        <component-component-viewer .componentInputData="${new IconComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                    <component-accordion-item header="Image">
                        <component-component-viewer .componentInputData="${new ImgComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item>
                    <component-accordion-item header="Link">
                        <component-component-viewer .componentInputData="${new LinkComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                    <component-accordion-item header="Navigation">
                        <component-component-viewer .componentInputData="${new NavigationComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                    <component-accordion-item header="text">
                        <component-component-viewer .componentInputData="${new TextComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                    <component-accordion-item header="Textarea">
                        <component-component-viewer .componentInputData="${new TextareaComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                    <component-accordion-item header="Textfield">
                        <component-component-viewer .componentInputData="${new InputComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item>
                </component-accordion>
             </component-flex-container>
      `;
    }

}