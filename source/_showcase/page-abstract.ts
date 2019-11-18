import { html, TemplateResult } from 'lit-element';
import { BasisTemplate } from '../index';

export abstract class PageAbstract extends BasisTemplate {
   getTopContent(): TemplateResult {
      return html`
         <component-menubar>
            <component-spacer slot="leftComponents" clazz="mediumPaddingLeft"></component-spacer>
            <component-icon slot="leftComponents" iconClazz="fas fa-bars" clickable="true"></component-icon>
            <component-i18n-selector slot="rightComponents"></component-i18n-selector>
         </component-menubar>
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
                  text="${this.i18nService.getValue('pageimg')}"
                  href="#pageimg"
               ></component-navigation-link>
               <component-navigation-link
                  iconClazz=""
                  text="${this.i18nService.getValue('pageform')}"
                  href="#pageform"
               ></component-navigation-link>
            </component-navigation-section>
         </component-navigation>
      `;
   }
}
