import {DefaultTemplate} from "../../templates/default/template";
import {customElement, html, TemplateResult} from "lit-element";

@customElement('page-dashboard')
export class DashboardPage extends DefaultTemplate {

    getMainComponent(): TemplateResult {
        return html`center`;
    }

    getLeftComponent(): TemplateResult {
        return html`Left`;
    }

    getTopContent(): TemplateResult {
        return html`Top`;
    }

}