import { customElement, html, TemplateResult } from 'lit-element';
import { PageAbstract } from './page-abstract';
import { HttpClientService } from '@domoskanonos/frontend-basis';
import { SpacerSize, TypographyTypes } from '..';

@customElement('page-settings')
export class PageSettings extends PageAbstract {
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
}
