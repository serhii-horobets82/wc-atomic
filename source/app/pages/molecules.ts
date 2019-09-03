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
import {ComponentViewerComponent} from "../../molecules/component-viewer/component";
import {ContentSliderComponent} from "../../molecules/content-slider/component";
import {DataProtection} from "../../molecules/data-protection/component";
import {IconGroupComponent} from "../../molecules/icon-group/component";
import {ImgSliderComponent} from "../../molecules/img-slider/component";
import {SearchComponent} from "../../molecules/search/component";
import {TeaserComponent} from "../../molecules/teaser/component";
import {TileComponent} from "../../molecules/tile/component";


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
                
                
                
                <component-accordion>
                    <component-accordion-item header="Breadcrumb">
                        <component-component-viewer .componentInputData="${new BreadcrumbComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                </component-accordion>
                
                <component-accordion>
                    <component-accordion-item header="Component Viewer">
                        <component-component-viewer .componentInputData="${new ComponentViewerComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                </component-accordion>
                
                <component-accordion>
                    <component-accordion-item header="Content Slider">
                        <component-component-viewer .componentInputData="${new ContentSliderComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                </component-accordion>
                
                <component-accordion>
                    <component-accordion-item header="Data Protection">
                        <component-component-viewer .componentInputData="${new DataProtection().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                </component-accordion>
  
                 <component-accordion>
                    <component-accordion-item header="Icon Group">
                        <component-component-viewer .componentInputData="${new IconGroupComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                </component-accordion>

               <component-accordion>
                    <component-accordion-item header="Image Slider">
                        <component-component-viewer .componentInputData="${new ImgSliderComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                </component-accordion>

               <component-accordion>
                    <component-accordion-item header="Search">
                        <component-component-viewer .componentInputData="${new SearchComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                </component-accordion>

              <component-accordion>
                    <component-accordion-item header="Teaser">
                        <component-component-viewer .componentInputData="${new TeaserComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                </component-accordion>

              <component-accordion>
                    <component-accordion-item header="Tile">
                        <component-component-viewer .componentInputData="${new TileComponent().getDefaultInputData()}"></component-component-viewer>
                    </component-accordion-item> 
                </component-accordion>
 
                
             </component-flex-container>
      `;
    }

}