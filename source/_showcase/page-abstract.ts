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
            <component-navigation-link icon="" text="Introduction" href="introduction"></component-navigation-link>
            <component-navigation-link slot="links" icon="" text="Get started" href="getStarted"></component-navigation-link>

            <component-navigation-section slot="links" text="Komponenten"></component-navigation-section>

            <component-navigation-link
               slot="links"
               icon="dashboard"
               text="Dashboard"
               href="dashboard"
            ></component-navigation-link>
            <component-navigation-link slot="links" icon="face" text="Users" href="users"></component-navigation-link>
            <component-navigation-link
               slot="links"
               icon="settings_applications"
               text="Einstell ungenasiodjsiodjdsj idojsdoisduiodu"
               href="settings"
            ></component-navigation-link>
            <component-navigation-link
               slot="links"
               icon=""
               text="Change Password"
               href="changepassword"
            ></component-navigation-link>
            <component-navigation-link slot="links" icon="" text="Register" href="register"></component-navigation-link>
            <component-navigation-link slot="links" icon="" text="Abmelden" href="logout"></component-navigation-link>
            <component-navigation-link
               slot="links"
               icon=""
               text="${I18nService.getUniqueInstance().getValue('pagelayout')}"
               href="pagelayout"
            ></component-navigation-link>
            <component-navigation-link
               slot="links"
               icon=""
               text="${I18nService.getUniqueInstance().getValue('pagetypography')}"
               href="pagetypography"
            ></component-navigation-link>
            <component-navigation-link
               slot="links"
               icon=""
               text="${I18nService.getUniqueInstance().getValue('pageinput')}"
               href="pageinput"
            ></component-navigation-link>
            <component-navigation-link
               slot="links"
               icon=""
               text="${I18nService.getUniqueInstance().getValue('pagebars')}"
               href="pagebars"
            ></component-navigation-link>
            <component-navigation-link
               slot="links"
               icon=""
               text="${I18nService.getUniqueInstance().getValue('pageicon')}"
               href="pageicon"
            ></component-navigation-link>
            <component-navigation-link
               slot="links"
               icon="table_chart"
               text="${I18nService.getUniqueInstance().getValue('pagetable')}"
               href="pagetable"
            ></component-navigation-link>
            <component-navigation-link
               slot="links"
               icon=""
               text="${I18nService.getUniqueInstance().getValue('pageimg')}"
               href="pageimg"
            ></component-navigation-link>
            <component-navigation-link
               slot="links"
               icon=""
               text="${I18nService.getUniqueInstance().getValue('pageelementlist')}"
               href="pageelementlist"
            ></component-navigation-link>
            <component-navigation-link
               slot="links"
               icon=""
               text="${I18nService.getUniqueInstance().getValue('pageform')}"
               href="pageform"
            ></component-navigation-link>
            <component-navigation-link
               slot="links"
               icon=""
               text="${I18nService.getUniqueInstance().getValue('pagecc')}"
               href="pagecc"
            ></component-navigation-link>
            <component-navigation-link
               slot="links"
               icon=""
               text="${I18nService.getUniqueInstance().getValue('pagecard')}"
               href="pagecard"
            ></component-navigation-link>
            <component-navigation-link
               slot="links"
               icon=""
               text="${I18nService.getUniqueInstance().getValue('pageprimarytitle')}"
               href="pageprimarytitle"
            ></component-navigation-link>
         </component-navigation>
      `;
   }
}
