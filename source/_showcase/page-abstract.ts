import {html, TemplateResult} from "lit-element";
import {BasisTemplate} from "../index";

export abstract class PageAbstract extends BasisTemplate {

    getTopContent(): TemplateResult {
        return html`<component-menubar>
                        <component-spacer slot="leftComponents" clazz="mediumPaddingLeft"></component-spacer>
                        <component-icon slot="leftComponents" iconClazz="fas fa-bars" clickable="true"></component-icon>
                    </component-menubar>`;
    }

    getLeftComponent(): TemplateResult {
        return html`<component-navigation>
                        <component-navigation-link slot="links" iconClazz="" text="Introduction" href="#introduction"></component-navigation-link>
                        <component-navigation-link slot="links" iconClazz="" text="Get started" href="#getStarted"></component-navigation-link>
                        <component-navigation-section slot="links">
                            <component-navigation-link iconClazz="" text="Input" href="#input"></component-navigation-link>
                        </component-navigation-section>
                    </component-navigation>`;
    }

}