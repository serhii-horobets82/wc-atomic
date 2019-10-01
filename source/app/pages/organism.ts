import {DefaultTemplate} from "../../templates/default/template";
import {customElement, TemplateResult, html} from "lit-element";
import {DefaultTemplateModel} from "../../templates/default/model";
import {data_navigation} from "../data/data";
import {ImgComponent} from "../../atoms/img/component";
import {ButtonComponent} from "../../atoms/button/component";
import {CheckboxComponent} from "../../input/checkbox/component";
import {CodeComponent} from "../../atoms/code/component";
import {ColorComponent} from "../../input/color/component";
import {ComboboxComponent} from "../../input/combobox/component";
import {DateComponent} from "../../input/date/component";
import {FormElementComponent} from "../../atoms/form-element/component";
import {H1Component, HComponent} from "../../atoms/h/component";
import {IconComponent} from "../../atoms/icon/component";
import {LinkComponent} from "../../atoms/link/component";
import {NavigationComponent} from "../../atoms/navigation/component";
import {RangeSliderComponent} from "../../input/range-slider/component";
import {TextComponent} from "../../atoms/text/component";
import {TextareaComponent} from "../../input/textarea/component";
import {InputComponent} from "../../input/input/component";
import {BreadcrumbComponent} from "../../molecules/breadcrumb/component";
import {ComponentViewerComponent} from "../../molecules/component-viewer/component";
import {ContentSliderComponent} from "../../molecules/content-slider/component";
import {DataProtection} from "../../molecules/data-protection/component";
import {IconGroupComponent} from "../../molecules/icon-group/component";
import {ImgSliderComponent} from "../../molecules/img-slider/component";
import {SearchComponent} from "../../molecules/search/component";
import {TeaserComponent} from "../../molecules/teaser/component";
import {TileComponent} from "../../molecules/tile/component";
import {AccordionComponent} from "../../organisms/accordion/container/component";
import {FormComponent} from "../../organisms/form/component";
import {TableComponent} from "../../organisms/table/component";
import {ToolbarComponent} from "../../organisms/toolbar/component";


@customElement('page-organism')
export class OrganismPage extends DefaultTemplate {

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
                    <component-accordion-item header="accordion">
                        <component-component-viewer .componentInputData="${new AccordionComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                </component-accordion>
    
                <component-accordion>
                    <component-accordion-item header="Form">
                        <component-component-viewer .componentInputData="${new FormComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                </component-accordion>
                
                 <component-accordion>
                    <component-accordion-item header="Table">
                        <component-component-viewer .componentInputData="${new TableComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                </component-accordion>
    
                <compoGRP_110nent-accordion>
                    <component-accordion-item header="Toolbar">
                        <component-component-viewer .componentInputData="${new ToolbarComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                </compoGRP_110nent-accordion>
                
             </component-flex-container>
      `;
    }

}