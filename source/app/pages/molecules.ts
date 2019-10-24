import {DefaultTemplate} from "../../templates/default/template";
import {customElement, html, TemplateResult} from "lit-element";
import {BreadcrumbComponent} from "../../molecules/breadcrumb/component";
import {ComponentViewerComponent} from "../../organisms/component-viewer/component";
import {ContentSliderComponent} from "../../molecules/content-slider/component";
import {DataProtection} from "../../molecules/data-protection/component";
import {IconGroupComponent} from "../../molecules/icon-group/component";
import {ImgSliderComponent} from "../../molecules/img-slider/component";
import {SearchComponent} from "../../molecules/search/component";
import {TeaserComponent} from "../../molecules/teaser/component";
import {TileComponent} from "../../molecules/tile/component";
import {AbstractBalcoPage} from "./abstract-balco-page";

@customElement('page-molecules')
export class MoleculesPage extends AbstractBalcoPage {

    constructor() {
        super();
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