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
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageabstract")}" href="#pageabstract"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageauthenticatedicon")}" href="#pageauthenticatedicon"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageauthentication")}" href="#pageauthentication"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagebreadcrumb")}" href="#pagebreadcrumb"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagebutton")}" href="#pagebutton"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagecode")}" href="#pagecode"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagecombobox")}" href="#pagecombobox"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagecompoundheader")}" href="#pagecompoundheader"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagecontainer")}" href="#pagecontainer"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagecontentslider")}" href="#pagecontentslider"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagedataprotection")}" href="#pagedataprotection"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagedatalist")}" href="#pagedatalist"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageflexcontainer")}" href="#pageflexcontainer"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageformelement")}" href="#pageformelement"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageform")}" href="#pageform"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagegetstarted")}" href="#pagegetstarted"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageh")}" href="#pageh"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagei18nselector")}" href="#pagei18nselector"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageicongroup")}" href="#pageicongroup"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageicon")}" href="#pageicon"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageimgsliderselector")}" href="#pageimgsliderselector"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageimgslider")}" href="#pageimgslider"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageimg")}" href="#pageimg"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageinput")}" href="#pageinput"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageintroduction")}" href="#pageintroduction"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageitem")}" href="#pageitem"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagelink")}" href="#pagelink"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagemenubar")}" href="#pagemenubar"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagenavigationlink")}" href="#pagenavigationlink"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagenavigationsection")}" href="#pagenavigationsection"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagenavigation")}" href="#pagenavigation"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagesearch")}" href="#pagesearch"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagespacer")}" href="#pagespacer"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagetabcontent")}" href="#pagetabcontent"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagetab")}" href="#pagetab"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagetable")}" href="#pagetable"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagetabs")}" href="#pagetabs"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageteaserelement")}" href="#pageteaserelement"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageteasermenuelement")}" href="#pageteasermenuelement"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pageteaser")}" href="#pageteaser"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagetemplatebasis")}" href="#pagetemplatebasis"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagetextwithheader")}" href="#pagetextwithheader"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagetext")}" href="#pagetext"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagetextarea")}" href="#pagetextarea"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagetile")}" href="#pagetile"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("pagetoolbar")}" href="#pagetoolbar"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("showcaseapp.js")}" href="#showcaseapp.js"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("showcaseapp.js.map")}" href="#showcaseapp.js.map"></component-navigation-link>
                                <component-navigation-link iconClazz="" text="${this.i18nService.getValue("showcaseapp")}" href="#showcaseapp"></component-navigation-link>
                        </component-navigation-section>
                    </component-navigation>`;
    }

}