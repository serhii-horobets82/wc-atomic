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
import {BreadcrumbComponent} from "../../molecules/breadcrumb/component";


@customElement('page-molecules')
export class MoleculesPage extends DefaultTemplate {

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
                    <component-accordion-item header="Breadcrumb">
                        <component-component-viewer .componentInputData="${new BreadcrumbComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                </component-accordion>
             </component-flex-container>
      `;
    }

}