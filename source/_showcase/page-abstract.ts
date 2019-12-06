import {html, TemplateResult} from 'lit-element';
import {BasisTemplate, TypographyTypes} from '../index';

export abstract class PageAbstract extends BasisTemplate {

   getTopContent(): TemplateResult {
      return html`
         <component-top-app-bar>
            <component-spacer slot="leftComponents" clazz="mediumPaddingLeft"></component-spacer>
            <component-icon slot="leftComponents" icon="menu" clickable="true"></component-icon>
            <component-i18n-selector slot="rightComponents"></component-i18n-selector>
         </component-top-app-bar>
      `;
   }

   getLeftComponent(): TemplateResult {
      return html`
         <component-navigation>
            <component-navigation-link
               slot="links"
               iconClazz=""
               text="Introduction"
               href="#introduction"
            ></component-navigation-link>
            <component-navigation-link
               slot="links"
               iconClazz=""
               text="Get started"
               href="#getStarted"
            ></component-navigation-link>
            <component-navigation-section slot="links">
               <component-typography slot="section" text="Komponenten"></component-typography>
               <component-navigation-link
                  iconClazz=""
                  text="${this.i18nService.getValue('pagelayout')}"
                  href="#pagelayout"
               ></component-navigation-link>
               <component-navigation-link
                  iconClazz=""
                  text="${this.i18nService.getValue('pagetypography')}"
                  href="#pagetypography"
               ></component-navigation-link>
               <component-navigation-link
                  iconClazz=""
                  text="${this.i18nService.getValue('pageinput')}"
                  href="#pageinput"
               ></component-navigation-link>
               <component-navigation-link
                  iconClazz=""
                  text="${this.i18nService.getValue('pagemenubar')}"
                  href="#pagemenubar"
               ></component-navigation-link>
                <component-navigation-link
                  iconClazz=""
                  text="${this.i18nService.getValue('pageicon')}"
                  href="#pageicon"
               ></component-navigation-link>
                <component-navigation-link
                  iconClazz=""
                  text="${this.i18nService.getValue('pagetable')}"
                  href="#pagetable"
               ></component-navigation-link>
                <component-navigation-link
                  iconClazz=""
                  text="${this.i18nService.getValue('pageimg')}"
                  href="#pageimg"
               ></component-navigation-link>
               <component-navigation-link
                  iconClazz=""
                  text="${this.i18nService.getValue('pageform')}"
                  href="#pageform"
               ></component-navigation-link>
               <component-navigation-link
                  iconClazz=""
                  text="${this.i18nService.getValue('pagecard')}"
                  href="#pagecard"
               ></component-navigation-link>
               <component-navigation-link
                  iconClazz=""
                  text="${this.i18nService.getValue('pageprimarytitle')}"
                  href="#pageprimarytitle"
               ></component-navigation-link>
            </component-navigation-section>
         </component-navigation>
      `;
   }
}
