import { customElement, TemplateResult, html } from 'lit-element';
import {BlankTemplate} from "../../templates/blank/template";
import {TeaserComponent} from "../../molecules/teaser/component";
import {TextWithHeaderComponent} from "../../molecules/text-with-header/component";


@customElement('page-landing')
export class LandingPage extends BlankTemplate {
    constructor() {
        super();
    }

    getContent(): TemplateResult {
        return html`
         <component-flex-container gridClazz="grid_100" columnFlexBasisValue="100%;">
         
            <component-teaser .inputData="${new TeaserComponent().getDefaultInputData()}"></component-teaser>
            <component-text-with-header .inputData="${new TextWithHeaderComponent().getDefaultInputData()}"></component-text-with-header>
            
         </component-flex-container>
         
      `;
    }
}