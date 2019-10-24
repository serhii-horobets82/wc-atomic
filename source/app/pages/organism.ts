import {DefaultTemplate} from "../../templates/default/template";
import {customElement, TemplateResult, html} from "lit-element";
import {DefaultTemplateModel} from "../../templates/default/model";
import {AccordionComponent} from "../../organisms/accordion/container/component";
import {FormComponent} from "../../organisms/form/component";
import {TableComponent} from "../../organisms/table/component";
import {ToolbarComponent} from "../../organisms/toolbar/component";
import {getNAV} from "../app-showcase";
import {AbstractBalcoPage} from "./abstract-balco-page";


@customElement('page-organism')
export class OrganismPage extends AbstractBalcoPage {

    constructor() {
        super();
    }

    initTemplateData(): DefaultTemplateModel {
        return <DefaultTemplateModel>{
            componentIdentifier: DefaultTemplate.IDENTIFIER,
            navigationInputData: getNAV(),
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