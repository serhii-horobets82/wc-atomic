import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import {HttpClientService} from '@domoskanonos/frontend-basis';
import {FlexJustifyContent, SpacerSize, TopBottomTemplate, TypographyTypes} from '..';

@customElement('page-settings')
export class PageSettings extends TopBottomTemplate {
   getTopContent(): TemplateResult {
      return html`
         <component-top-app-bar>
            <component-icon slot="leftComponents" icon="menu" clickable="true"></component-icon>
            <component-spacer slot="leftComponents" size="${SpacerSize.SMALL}"></component-spacer>
            <component-typography slot="leftComponents" .type="${TypographyTypes.H6}">Einstellungen</component-typography>
            <component-authenticated-icon
               .isAuthenticated="${HttpClientService.getInstance().isAuthenticated()}"
               loginPage="#login"
               logoutPage="#logout"
               slot="rightComponents"
            ></component-authenticated-icon>
         </component-top-app-bar>
      `;
   }

   getMainComponent(): TemplateResult {
      return html`
         <component-typography .type="${TypographyTypes.H4}">Settings</component-typography>
         <component-form>
            <component-i18n-selector></component-i18n-selector>
         </component-form>
      `;
   }

   getBottomContent(): TemplateResult {
      return html`
         <component-bottom-app-bar .flexJustifyContent="${FlexJustifyContent.SPACE_AROUND}">
            <component-icon-with-text .clickable="${true}" icon="home" text="Home"></component-icon-with-text>
            <component-icon-with-text icon="home" text="Home"></component-icon-with-text>
            <component-icon-with-text icon="home" text="Home"></component-icon-with-text>
            <component-icon-with-text icon="home" text="Home"></component-icon-with-text>
            <component-icon-with-text icon="home" text="Home"></component-icon-with-text>
            <component-icon-with-text icon="home" text="Home"></component-icon-with-text>
         </component-bottom-app-bar>
      `;
   }

   getLeftComponent(): TemplateResult {
      return html`
         <component-navigation>
            <component-navigation-link icon="" text="Introduction" href="#introduction"></component-navigation-link>
            <component-navigation-link slot="links" icon="" text="Get started" href="#getStarted"></component-navigation-link>
            <component-navigation-section slot="links">
               <component-typography slot="section" text="Komponenten"></component-typography>
               <component-navigation-link icon="dashboard" text="Dashboard" href="#dashboard"></component-navigation-link>
               <component-navigation-link icon="face" text="Users" href="#users"></component-navigation-link>
               <component-navigation-link
                  icon="settings_applications"
                  text="Einstellungen"
                  href="#settings"
               ></component-navigation-link>
               <component-navigation-link
                  slot="links"
                  icon=""
                  text="Change Password"
                  href="#changepassword"
               ></component-navigation-link>
               <component-navigation-link icon="" text="Register" href="#register"></component-navigation-link>
               <component-navigation-link icon="" text="Abmelden" href="#logout"></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${this.i18nService.getValue('pagelayout')}"
                  href="#pagelayout"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${this.i18nService.getValue('pagetypography')}"
                  href="#pagetypography"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${this.i18nService.getValue('pageinput')}"
                  href="#pageinput"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${this.i18nService.getValue('pagemenubar')}"
                  href="#pagemenubar"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${this.i18nService.getValue('pageicon')}"
                  href="#pageicon"
               ></component-navigation-link>
               <component-navigation-link
                  icon="table_chart"
                  text="${this.i18nService.getValue('pagetable')}"
                  href="#pagetable"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${this.i18nService.getValue('pageimg')}"
                  href="#pageimg"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${this.i18nService.getValue('pageelementlist')}"
                  href="#pageelementlist"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${this.i18nService.getValue('pageform')}"
                  href="#pageform"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${this.i18nService.getValue('pagecc')}"
                  href="#pagecc"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${this.i18nService.getValue('pagecard')}"
                  href="#pagecard"
               ></component-navigation-link>
               <component-navigation-link
                  icon=""
                  text="${this.i18nService.getValue('pageprimarytitle')}"
                  href="#pageprimarytitle"
               ></component-navigation-link>
            </component-navigation-section>
         </component-navigation>
      `;
   }
}
