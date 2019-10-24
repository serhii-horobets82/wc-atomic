import {customElement, html, TemplateResult} from 'lit-element';
import {DefaultTemplate} from "../../templates/default/template";
import {AbstractBalcoPage} from "./abstract-balco-page";


@customElement('page-homepage')
export class HomePage extends AbstractBalcoPage {

    constructor() {
        super();


    }

    getContent(): TemplateResult {
        return html``;
    }

}