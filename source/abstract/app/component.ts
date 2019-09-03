import {LitElement, TemplateResult} from "lit-element";
import {router} from "../../util/router";

export abstract class AbstractApp extends LitElement {

    render() {
        return this.renderPage();
    }

    firstUpdated() {
        router.subscribe((path) => this.requestUpdate());
    }

    abstract renderPage(): TemplateResult;


}