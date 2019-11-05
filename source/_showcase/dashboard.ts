import {BasisTemplate} from "..";
import {customElement, html, TemplateResult} from "lit-element";

@customElement('page-dashboard')
export class Dashboard extends BasisTemplate {
    getTopContent(): TemplateResult {
        return html`<component-menubar>
                        <component-spacer slot="leftComponents" clazz="mediumPaddingLeft"></component-spacer>
                        <component-icon slot="leftComponents" iconClazz="fas fa-bars" clickable="true"></component-icon>
                    </component-menubar>`;
    }

    getLeftComponent(): TemplateResult {
        return html``;
    }

    getMainComponent(): TemplateResult {
        return html``;
    }

}