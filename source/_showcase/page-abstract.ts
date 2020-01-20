import { html, TemplateResult } from 'lit-element';
import { BasisTemplate, TypographyType } from '../index';
import { I18nService } from '@domoskanonos/frontend-basis';

export abstract class PageAbstract extends BasisTemplate {
   getTopContent(): TemplateResult {
      return html`
         <component-top-app-bar>
            <component-spacer slot="leftComponents" clazz="mediumPaddingLeft"></component-spacer>
            <component-icon slot="leftComponents" icon="menu" clickable="true"></component-icon>
            <component-icon slot="rightComponents" icon="search" clickable="true"></component-icon>
         </component-top-app-bar>
      `;
   }

   getLeftComponent(): TemplateResult {
      return html`
         <component-navigation>
            <component-navigation-link
               icon=""
               text="Introduction"
               href="introduction"
            ></component-navigation-link>
            <component-navigation-link
               slot="links"
               icon=""
               text="Get started"
               href="getStarted"
            ></component-navigation-link>
            <component-navigation-section slot="links">
               <component-typography slot="section" text="Komponenten"></component-typography>
               <component-navigation-link icon="dashboard" text="Dashboard" href="dashboard"></component-navigation-link>
               <component-navigation-link icon="face" text="Users" href="users"></component-navigation-link>
               <component-navigation-link icon="settings_applications" text="Einstellungen" href="settings"></component-navigation-link>
               <component-navigation-link
                  slot="links"
                  icon=""
                  text="Change Password"
                  href="changepassword"
               ></component-navigation-link>
               <component-navigation-link icon="" text="Register" href="register"></component-navigation-link>
               <component-navigation-link icon="" text="Abmelden" href="logout"></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${I18nService.getInstance().getValue('pagelayout')}"
                  href="pagelayout"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${I18nService.getInstance().getValue('pagetypography')}"
                  href="pagetypography"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${I18nService.getInstance().getValue('pageinput')}"
                  href="pageinput"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${I18nService.getInstance().getValue('pagebars')}"
                  href="pagebars"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${I18nService.getInstance().getValue('pageicon')}"
                  href="pageicon"
               ></component-navigation-link>
               <component-navigation-link
                  icon="table_chart"
                  text="${I18nService.getInstance().getValue('pagetable')}"
                  href="pagetable"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${I18nService.getInstance().getValue('pageimg')}"
                  href="pageimg"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${I18nService.getInstance().getValue('pageelementlist')}"
                  href="pageelementlist"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${I18nService.getInstance().getValue('pageform')}"
                  href="pageform"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${I18nService.getInstance().getValue('pagecc')}"
                  href="pagecc"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${I18nService.getInstance().getValue('pagecard')}"
                  href="pagecard"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${I18nService.getInstance().getValue('pageprimarytitle')}"
                  href="pageprimarytitle"
               ></component-navigation-link>
            </component-navigation-section>
         </component-navigation>
      `;
   }
}
