import {customElement, html, TemplateResult} from "lit-element";
import {PageAbstract} from "./page-abstract";

@customElement('page-input')
export class PageInput extends PageAbstract {

    getMainComponent(): TemplateResult {
        return html`
        <component-flex-container gridClazz="grid_50">
            <component-spacer clazz="maxPaddingTop"></component-spacer>

            <component-tile cssStyle="height:500px; width:500px;">
                <component-inputfield></component-inputfield>
            </component-tile>
            
            <component-text>
                html tag:
            </component-text>
            <component-code code="<component-inputfield></component-inputfield>"></component-code>


            <component-text>
                initialize programmatically:
            </component-text>
            <component-code> let inputField: InputComponent = new InputComponent();</component-code>
            
           
         </component-flex-container>
        
        
        `;
    }

}