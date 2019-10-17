import {customElement, html, TemplateResult} from 'lit-element';
import {DefaultTemplate} from "../../templates/default/template";


@customElement('page-homepage')
export class HomePage extends DefaultTemplate {

    constructor() {
        super();


    }

    getContent(): TemplateResult {
        return html``;
    }

}