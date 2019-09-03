import {DefaultTemplate} from "../../templates/default/template";
import {customElement, TemplateResult, html} from "lit-element";
import {DefaultTemplateModel} from "../../templates/default/model";
import {data_navigation} from "../data/data";
import {ImgComponent} from "../../atoms/img/component";
import {ButtonComponent} from "../../atoms/button/component";
import {CheckboxComponent} from "../../atoms/checkbox/component";
import {CodeComponent} from "../../atoms/code/component";
import {ColorComponent} from "../../atoms/color/component";
import {ComboboxComponent} from "../../atoms/combobox/component";
import {DateComponent} from "../../atoms/date/component";
import {FormElementComponent} from "../../atoms/form-element/component";
import {H1Component, HComponent} from "../../atoms/h/component";
import {IconComponent} from "../../atoms/icon/component";
import {LinkComponent} from "../../atoms/link/component";
import {NavigationComponent} from "../../atoms/navigation/component";
import {RangeSliderComponent} from "../../atoms/range-slider/component";
import {TextComponent} from "../../atoms/text/component";
import {TextareaComponent} from "../../atoms/textarea/component";
import {TextfieldComponent} from "../../atoms/textfield/component";


@customElement('page-atoms')
export class AtomsPage extends DefaultTemplate {

    constructor() {
        super();
    }

    initTemplateData(): DefaultTemplateModel {
        return <DefaultTemplateModel>{
            componentIdentifier: DefaultTemplate.IDENTIFIER,
            navigation: data_navigation,
        }
    }

    getContent(): TemplateResult {
        return html`
             <component-flex-container gridClazz="grid_75" columnFlexBasisValue="100%;">
                <component-accordion>
                    <component-accordion-item header="Button">
                        <component-component-viewer .componentInputData="${new ButtonComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                    <component-accordion-item header="Checkbox">
                        <component-component-viewer .componentInputData="${new CheckboxComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                    <component-accordion-item header="Code">
                        <component-component-viewer .componentInputData="${new CodeComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                    <component-accordion-item header="Color">
                        <component-component-viewer .componentInputData="${new ColorComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                    <component-accordion-item header="Combobox">
                        <component-component-viewer .componentInputData="${new ComboboxComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item>
                    <component-accordion-item header="Date">
                        <component-component-viewer .componentInputData="${new DateComponent().getDefaultInputData()}"></component-component-viewer>
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
                    <component-accordion-item header="Range-Slider">
                        <component-component-viewer .componentInputData="${new RangeSliderComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                    <component-accordion-item header="text">
                        <component-component-viewer .componentInputData="${new TextComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                    <component-accordion-item header="Textarea">
                        <component-component-viewer .componentInputData="${new TextareaComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                    <component-accordion-item header="Textfield">
                        <component-component-viewer .componentInputData="${new TextfieldComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item>
                </component-accordion>
             </component-flex-container>
      `;
    }

}